import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';
import { PrivateChat } from '@/app/components/PrivateChat';
import {
  Clock,
  CheckCircle,
  FileText,
  Plus,
  X,
  Calendar,
  Phone,
  MessageCircle,
  Download,
  ClipboardCheck,
  ExternalLink,
  Upload,
  User,
  Trash2,
  Edit,
  Save
} from 'lucide-react';

interface UpcomingEvent {
  id: string;
  title: string;
  event_date: string;
  event_type: string;
}

interface ConsultationRequest {
  id: string;
  consultation_date: string;
  consultation_time: string;
  topic: string;
  message: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

interface StudentApplication {
  id: string;
  university: string;
  country: string;
  program: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

interface NewApplicationForm {
  full_name: string;
  email: string;
  phone: string;
  country_preference: string;
  university: string;
  program_type: string;
  education_level: string;
  message: string;
}

interface UserProfile {
  phone: string;
  country: string;
  date_of_birth: string;
}

interface UserDocument {
  id: string;
  document_type: string;
  original_name: string;
  file_size: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myApplications, setMyApplications] = useState<StudentApplication[]>([]);
  const [myConsultations, setMyConsultations] = useState<ConsultationRequest[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewAppModal, setShowNewAppModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newAppForm, setNewAppForm] = useState<NewApplicationForm>({
    full_name: '',
    email: '',
    phone: '',
    country_preference: '',
    university: '',
    program_type: '',
    education_level: '',
    message: ''
  });

  // Quick Action modals
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showCuratorModal, setShowCuratorModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  const [consultationForm, setConsultationForm] = useState({
    date: '',
    time: '',
    topic: '',
    message: ''
  });
  const [consultationSubmitting, setConsultationSubmitting] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);

  // Profile state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState<UserProfile>({
    phone: '',
    country: '',
    date_of_birth: ''
  });
  const [profileSaving, setProfileSaving] = useState(false);

  // Documents state
  const [myDocuments, setMyDocuments] = useState<UserDocument[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/login');
      return;
    }

    // Initialize form with user data
    setNewAppForm(prev => ({
      ...prev,
      full_name: user.name || '',
      email: user.email || ''
    }));

    loadApplications();
    loadUpcomingEvents();
    loadMyConsultations();
    loadMyDocuments();
    loadUserProfile();
  }, [user, navigate]);

  const loadUserProfile = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch(`http://localhost:3000/api/users/${user?.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success && data.data) {
        setProfileForm({
          phone: data.data.phone || '',
          country: data.data.country || '',
          date_of_birth: data.data.date_of_birth?.split('T')[0] || ''
        });
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const loadMyDocuments = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/documents/my', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success && data.data) {
        setMyDocuments(data.data);
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch(`http://localhost:3000/api/users/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (data.success) {
        alert('Профиль успешно обновлен!');
        setShowProfileModal(false);
      } else {
        alert(data.message || 'Ошибка обновления профиля');
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('Ошибка сохранения профиля');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileInput = document.getElementById('document-file') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file || !selectedDocType) {
      alert('Выберите файл и тип документа');
      return;
    }

    setUploadingDoc(true);
    try {
      const token = localStorage.getItem('ketem_token');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('document_type', selectedDocType);

      const response = await fetch('http://localhost:3000/api/documents/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        alert('Документ успешно загружен!');
        setShowUploadModal(false);
        setSelectedDocType('');
        loadMyDocuments();
      } else {
        alert(data.message || 'Ошибка загрузки документа');
      }
    } catch (error) {
      console.error('Failed to upload document:', error);
      alert('Ошибка загрузки документа');
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот документ?')) return;

    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch(`http://localhost:3000/api/documents/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        loadMyDocuments();
      } else {
        alert(data.message || 'Ошибка удаления документа');
      }
    } catch (error) {
      console.error('Failed to delete document:', error);
    }
  };

  const getDocTypeName = (type: string) => {
    const types: Record<string, string> = {
      'passport': 'Паспорт',
      'diploma': 'Аттестат/Диплом',
      'photo': 'Фотография',
      'motivation_letter': 'Мотивационное письмо',
      'recommendation': 'Рекомендательное письмо',
      'language_certificate': 'Языковой сертификат',
      'other': 'Другое'
    };
    return types[type] || type;
  };

  const getDocStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">На проверке</span>;
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Одобрен</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Отклонен</span>;
      default:
        return null;
    }
  };

  const loadMyConsultations = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/consultations/my', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success && data.data) {
        setMyConsultations(data.data);
      }
    } catch (error) {
      console.error('Failed to load consultations:', error);
    }
  };

  const loadUpcomingEvents = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      // Try to get events with auth first, fall back to public endpoint
      const response = await fetch('http://localhost:3000/api/events?active_only=true', {
        headers: token ? {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } : {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Filter to show only future events
          const futureEvents = data.data
            .filter((event: any) => new Date(event.event_date) >= new Date());
          setUpcomingEvents(futureEvents);
          return;
        }
      }

      // Fallback to public upcoming endpoint
      const publicResponse = await fetch('http://localhost:3000/api/events/upcoming?limit=50');
      const publicData = await publicResponse.json();
      if (publicData.success && publicData.data) {
        setUpcomingEvents(publicData.data);
      }
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const loadApplications = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/applications/my', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success && data.data) {
        const mappedApps: StudentApplication[] = data.data.map((app: any) => ({
          id: app.id.toString(),
          university: app.university || 'Не указано',
          country: app.country_preference || 'Не указано',
          program: app.program_type || 'Не указано',
          status: app.status === 'reviewing' ? 'pending' : app.status,
          date: app.created_at?.split('T')[0] || new Date().toISOString().split('T')[0]
        }));
        setMyApplications(mappedApps);
      }
    } catch (error) {
      console.error('Failed to load applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/applications', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAppForm)
      });

      const data = await response.json();
      if (data.success) {
        setShowNewAppModal(false);
        setNewAppForm({
          full_name: user?.name || '',
          email: user?.email || '',
          phone: '',
          country_preference: '',
          university: '',
          program_type: '',
          education_level: '',
          message: ''
        });
        loadApplications();
      } else {
        alert(data.message || 'Ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Failed to submit application:', error);
      alert('Ошибка при отправке заявки');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            <Clock className="w-4 h-4" />
            <span>В обработке</span>
          </span>
        );
      case 'approved':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Одобрено</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
            <span>✕</span>
            <span>Отклонено</span>
          </span>
        );
      default:
        return null;
    }
  };

  const stats = {
    total: myApplications.length,
    pending: myApplications.filter(app => app.status === 'pending').length,
    approved: myApplications.filter(app => app.status === 'approved').length,
    rejected: myApplications.filter(app => app.status === 'rejected').length
  };

  const getConsultationStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            <Clock className="w-4 h-4" />
            <span>Ожидает</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Подтверждено</span>
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Завершено</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
            <X className="w-4 h-4" />
            <span>Отменено</span>
          </span>
        );
      default:
        return null;
    }
  };

  const getTopicLabel = (topic: string) => {
    const topics: Record<string, string> = {
      'admission': 'Поступление в университет',
      'documents': 'Подготовка документов',
      'visa': 'Виза и легализация',
      'programs': 'Выбор программы',
      'other': 'Другое'
    };
    return topics[topic] || topic;
  };

  const handleBookConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationSubmitting(true);
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/consultations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...consultationForm,
          user_name: user?.name,
          user_email: user?.email
        })
      });
      const data = await response.json();
      if (data.success) {
        alert('Консультация успешно забронирована!');
        setShowConsultationModal(false);
        setConsultationForm({ date: '', time: '', topic: '', message: '' });
        loadMyConsultations();
      } else {
        alert(data.message || 'Ошибка при бронировании');
      }
    } catch (error) {
      console.error('Failed to book consultation:', error);
      alert('Ошибка при бронировании консультации');
    } finally {
      setConsultationSubmitting(false);
    }
  };

  const documentChecklist = [
    { name: 'Паспорт', status: 'pending', description: 'Копия загранпаспорта' },
    { name: 'Аттестат/Диплом', status: 'pending', description: 'Документ об образовании' },
    { name: 'Фотография', status: 'pending', description: '3x4 см, цветная' },
    { name: 'Мотивационное письмо', status: 'pending', description: 'На языке обучения' },
    { name: 'Рекомендательные письма', status: 'pending', description: '2 письма' },
    { name: 'Языковой сертификат', status: 'pending', description: 'IELTS/TOEFL/другой' }
  ];

  const materials = [
    { name: 'Руководство по поступлению', type: 'PDF', size: '2.4 MB', url: '#' },
    { name: 'Список университетов 2024', type: 'PDF', size: '1.8 MB', url: '#' },
    { name: 'Образец мотивационного письма', type: 'DOCX', size: '45 KB', url: '#' },
    { name: 'Чек-лист документов', type: 'PDF', size: '320 KB', url: '#' },
    { name: 'Полезные контакты', type: 'PDF', size: '180 KB', url: '#' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
          <p className="text-gray-600 mt-2">Добро пожаловать, {user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Мои заявки</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileText className="w-12 h-12 text-orange-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">В обработке</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Одобрено</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Отклонено</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <X className="w-12 h-12 text-red-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Быстрые действия</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setShowConsultationModal(true)}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <Phone className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center">
                Записаться на консультацию
              </span>
            </button>

            <button
              onClick={() => setShowCuratorModal(true)}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <MessageCircle className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center">
                Связаться с куратором
              </span>
            </button>

            <button
              onClick={() => setShowDocumentsModal(true)}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <ClipboardCheck className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center">
                Проверить документы
              </span>
            </button>

            <button
              onClick={() => setShowMaterialsModal(true)}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <Download className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center">
                Скачать материалы
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Applications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Мои заявки</h2>
                <button
                  onClick={() => setShowNewAppModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Подать заявку</span>
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Загрузка...</p>
                </div>
              ) : myApplications.length > 0 ? (
                <div className="space-y-4">
                  {myApplications.map(app => (
                    <div
                      key={app.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{app.university}</h3>
                          <p className="text-sm text-gray-600">{app.country}</p>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{app.program}</p>
                      <p className="text-xs text-gray-500">
                        Подано: {new Date(app.date).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">У вас пока нет заявок на обучение</p>
                </div>
              )}
            </div>

            {/* My Consultations */}
            {myConsultations.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Мои консультации</h2>
                  <button
                    onClick={() => setShowConsultationModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Записаться</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {myConsultations.map(consultation => (
                    <div
                      key={consultation.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{getTopicLabel(consultation.topic)}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(consultation.consultation_date).toLocaleDateString('ru-RU')} в {consultation.consultation_time}
                          </p>
                        </div>
                        {getConsultationStatusBadge(consultation.status)}
                      </div>
                      {consultation.message && (
                        <p className="text-sm text-gray-700 mb-2">{consultation.message}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Подано: {new Date(consultation.created_at).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold flex items-center space-x-2">
                  <User className="w-5 h-5 text-orange-500" />
                  <span>Мой профиль</span>
                </h3>
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="p-1 text-orange-500 hover:bg-orange-50 rounded"
                  title="Редактировать"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Имя:</span>
                  <p className="font-medium">{user?.name}</p>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <span className="text-gray-500">Телефон:</span>
                  <p className="font-medium">{profileForm.phone || <span className="text-gray-400 italic">Не указан</span>}</p>
                </div>
                <div>
                  <span className="text-gray-500">Страна:</span>
                  <p className="font-medium">{profileForm.country || <span className="text-gray-400 italic">Не указана</span>}</p>
                </div>
                <div>
                  <span className="text-gray-500">Дата рождения:</span>
                  <p className="font-medium">
                    {profileForm.date_of_birth
                      ? new Date(profileForm.date_of_birth).toLocaleDateString('ru-RU')
                      : <span className="text-gray-400 italic">Не указана</span>
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* My Documents */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-orange-500" />
                  <span>Мои документы</span>
                </h3>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="p-1 text-orange-500 hover:bg-orange-50 rounded"
                  title="Загрузить документ"
                >
                  <Upload className="w-4 h-4" />
                </button>
              </div>
              {myDocuments.length > 0 ? (
                <div className="space-y-2">
                  {myDocuments.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{getDocTypeName(doc.document_type)}</p>
                        <p className="text-xs text-gray-500 truncate">{doc.original_name}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-2">
                        {getDocStatusBadge(doc.status)}
                        <button
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                          title="Удалить"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Нет загруженных документов</p>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="text-sm text-orange-500 hover:text-orange-600 mt-2"
                  >
                    Загрузить документ
                  </button>
                </div>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span>Предстоящие события</span>
              </h3>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {(showAllEvents ? upcomingEvents : upcomingEvents.slice(0, 5)).map(event => (
                    <div key={event.id} className="text-sm border-l-2 border-orange-500 pl-3 py-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-gray-500 text-xs">
                        {new Date(event.event_date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                        {event.event_type === 'webinar' ? 'Вебинар' :
                         event.event_type === 'open_day' ? 'День открытых дверей' :
                         event.event_type === 'consultation' ? 'Консультация' : 'Событие'}
                      </span>
                    </div>
                  ))}
                  {upcomingEvents.length > 5 && (
                    <button
                      onClick={() => setShowAllEvents(!showAllEvents)}
                      className="text-sm text-orange-500 hover:text-orange-600 font-medium mt-2"
                    >
                      {showAllEvents ? 'Скрыть' : `Показать все (${upcomingEvents.length})`}
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Нет предстоящих событий</p>
                </div>
              )}
            </div>

            {/* Online Users */}
            {/* <OnlineUsers /> */}
          </div>
        </div>
      </div>

      {/* Live Chat Widget */}
      {/* {user && (
        <LiveChat
          currentUserId={user.email}
          currentUserName={user.name}
          currentUserRole="student"
        />
      )} */}

      {/* New Application Modal */}
      {showNewAppModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Новая заявка на обучение</h3>
                <button
                  onClick={() => setShowNewAppModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ФИО
                  </label>
                  <input
                    type="text"
                    value={newAppForm.full_name}
                    onChange={(e) => setNewAppForm({ ...newAppForm, full_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newAppForm.email}
                    onChange={(e) => setNewAppForm({ ...newAppForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={newAppForm.phone}
                    onChange={(e) => setNewAppForm({ ...newAppForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Страна обучения
                  </label>
                  <select
                    value={newAppForm.country_preference}
                    onChange={(e) => setNewAppForm({ ...newAppForm, country_preference: e.target.value, university: '' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Выберите страну</option>
                    <option value="Италия">Италия</option>
                    <option value="Чехия">Чехия</option>
                    <option value="Словакия">Словакия</option>
                    <option value="Германия">Германия</option>
                    <option value="Польша">Польша</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Университет
                  </label>
                  <input
                    type="text"
                    value={newAppForm.university}
                    onChange={(e) => setNewAppForm({ ...newAppForm, university: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Название университета (необязательно)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Направление
                  </label>
                  <select
                    value={newAppForm.program_type}
                    onChange={(e) => setNewAppForm({ ...newAppForm, program_type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Выберите направление</option>
                    <option value="Медицина">Медицина</option>
                    <option value="Инженерия">Инженерия</option>
                    <option value="IT">IT и программирование</option>
                    <option value="Бизнес">Бизнес и экономика</option>
                    <option value="Право">Право</option>
                    <option value="Искусство">Искусство и дизайн</option>
                    <option value="Другое">Другое</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Уровень образования
                  </label>
                  <select
                    value={newAppForm.education_level}
                    onChange={(e) => setNewAppForm({ ...newAppForm, education_level: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Выберите уровень</option>
                    <option value="Бакалавриат">Бакалавриат</option>
                    <option value="Магистратура">Магистратура</option>
                    <option value="Докторантура">Докторантура</option>
                    <option value="Языковые курсы">Языковые курсы</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дополнительная информация
                  </label>
                  <textarea
                    value={newAppForm.message}
                    onChange={(e) => setNewAppForm({ ...newAppForm, message: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Расскажите о себе и своих целях..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewAppModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Отправка...' : 'Отправить'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Записаться на консультацию</h3>
                <button
                  onClick={() => setShowConsultationModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleBookConsultation} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Предпочтительная дата
                  </label>
                  <input
                    type="date"
                    value={consultationForm.date}
                    onChange={(e) => setConsultationForm({ ...consultationForm, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Предпочтительное время
                  </label>
                  <select
                    value={consultationForm.time}
                    onChange={(e) => setConsultationForm({ ...consultationForm, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Выберите время</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тема консультации
                  </label>
                  <select
                    value={consultationForm.topic}
                    onChange={(e) => setConsultationForm({ ...consultationForm, topic: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Выберите тему</option>
                    <option value="admission">Поступление в университет</option>
                    <option value="documents">Подготовка документов</option>
                    <option value="visa">Виза и легализация</option>
                    <option value="programs">Выбор программы</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дополнительные вопросы
                  </label>
                  <textarea
                    value={consultationForm.message}
                    onChange={(e) => setConsultationForm({ ...consultationForm, message: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Опишите ваши вопросы..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowConsultationModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={consultationSubmitting}
                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {consultationSubmitting ? 'Отправка...' : 'Записаться'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Curator Contact Modal */}
      {showCuratorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Связаться с куратором</h3>
                <button
                  onClick={() => setShowCuratorModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Ваш персональный куратор</h4>
                      <p className="text-sm text-gray-600">Готов помочь с любыми вопросами</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="https://t.me/ketem_support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">T</span>
                      </div>
                      <div>
                        <p className="font-medium">Telegram</p>
                        <p className="text-sm text-gray-500">@ketem_support</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </a>

                  <a
                    href="https://wa.me/79001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">W</span>
                      </div>
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <p className="text-sm text-gray-500">+7 900 123-45-67</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </a>

                  <a
                    href="mailto:curator@ketem.edu"
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">@</span>
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-gray-500">curator@ketem.edu</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </a>

                  <a
                    href="tel:+79001234567"
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Позвонить</p>
                        <p className="text-sm text-gray-500">+7 900 123-45-67</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </a>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Время работы: Пн-Пт 9:00-18:00 (МСК)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Check Modal */}
      {showDocumentsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Проверка документов</h3>
                <button
                  onClick={() => setShowDocumentsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Отметьте документы, которые у вас уже готовы. Это поможет вашему куратору понять, что нужно подготовить.
                </p>
              </div>

              <div className="space-y-3">
                {documentChecklist.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={`doc-${index}`}
                        className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <div>
                        <label htmlFor={`doc-${index}`} className="font-medium cursor-pointer">
                          {doc.name}
                        </label>
                        <p className="text-sm text-gray-500">{doc.description}</p>
                      </div>
                    </div>
                    <ClipboardCheck className="w-5 h-5 text-gray-300" />
                  </div>
                ))}
              </div>

              <div className="flex space-x-3 pt-6">
                <button
                  onClick={() => setShowDocumentsModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  Закрыть
                </button>
                <button
                  onClick={() => {
                    alert('Статус документов сохранен!');
                    setShowDocumentsModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Materials Download Modal */}
      {showMaterialsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Скачать материалы</h3>
                <button
                  onClick={() => setShowMaterialsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  Полезные материалы для подготовки к поступлению. Скачайте все необходимые документы.
                </p>
              </div>

              <div className="space-y-3">
                {materials.map((material, index) => (
                  <a
                    key={index}
                    href={material.url}
                    download
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium">{material.name}</p>
                        <p className="text-sm text-gray-500">{material.type} • {material.size}</p>
                      </div>
                    </div>
                    <Download className="w-5 h-5 text-orange-500" />
                  </a>
                ))}
              </div>

              <button
                onClick={() => setShowMaterialsModal(false)}
                className="w-full mt-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Редактировать профиль</h3>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Страна
                  </label>
                  <select
                    value={profileForm.country}
                    onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Выберите страну</option>
                    <option value="Россия">Россия</option>
                    <option value="Казахстан">Казахстан</option>
                    <option value="Узбекистан">Узбекистан</option>
                    <option value="Беларусь">Беларусь</option>
                    <option value="Украина">Украина</option>
                    <option value="Кыргызстан">Кыргызстан</option>
                    <option value="Таджикистан">Таджикистан</option>
                    <option value="Туркменистан">Туркменистан</option>
                    <option value="Азербайджан">Азербайджан</option>
                    <option value="Армения">Армения</option>
                    <option value="Грузия">Грузия</option>
                    <option value="Молдова">Молдова</option>
                    <option value="Другая">Другая</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дата рождения
                  </label>
                  <input
                    type="date"
                    value={profileForm.date_of_birth}
                    onChange={(e) => setProfileForm({ ...profileForm, date_of_birth: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={profileSaving}
                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{profileSaving ? 'Сохранение...' : 'Сохранить'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Загрузить документ</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleUploadDocument} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тип документа
                  </label>
                  <select
                    value={selectedDocType}
                    onChange={(e) => setSelectedDocType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Выберите тип</option>
                    <option value="passport">Паспорт</option>
                    <option value="diploma">Аттестат/Диплом</option>
                    <option value="photo">Фотография</option>
                    <option value="motivation_letter">Мотивационное письмо</option>
                    <option value="recommendation">Рекомендательное письмо</option>
                    <option value="language_certificate">Языковой сертификат</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Файл
                  </label>
                  <input
                    type="file"
                    id="document-file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Разрешенные форматы: PDF, JPG, PNG, DOC, DOCX. Макс. размер: 10 МБ
                  </p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={uploadingDoc}
                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{uploadingDoc ? 'Загрузка...' : 'Загрузить'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Private Chat Widget */}
      {user && (
        <PrivateChat
          currentUserId={user.id}
          currentUserName={user.name}
          currentUserRole="student"
        />
      )}
    </div>
  );
};