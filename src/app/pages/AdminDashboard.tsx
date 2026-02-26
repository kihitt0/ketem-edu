import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';
import { PrivateChat } from '@/app/components/PrivateChat';
import { motion } from 'motion/react';
import {
  Users,
  FileText,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  Bell,
  GraduationCap,
  Settings,
  BarChart3,
  Globe,
  BookOpen,
  Shield,
  Home,
  Save,
  X,
  Eye,
  MapPin,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  Download,
  Upload,
  File
} from 'lucide-react';

interface Application {
  id: string;
  studentName: string;
  studentEmail: string;
  university: string;
  country: string;
  program: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  notes: string;
}

interface University {
  id: string;
  name: string;
  nameEn: string;
  country: string;
  city: string;
  tuition: string;
  programs: string[];
  ranking: string;
  image: string;
  description: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  registeredDate: string;
  status: 'active' | 'blocked';
  phone?: string;
  country?: string;
  date_of_birth?: string;
}

interface UserDocument {
  id: string;
  user_id: number;
  user_name: string;
  user_email: string;
  document_type: string;
  original_name: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string;
  created_at: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_type: 'webinar' | 'open_day' | 'consultation' | 'other';
  location: string;
  is_online: boolean;
  link: string;
  is_active: boolean;
}

interface Consultation {
  id: string;
  user_id: number;
  user_name: string;
  user_email: string;
  consultation_date: string;
  consultation_time: string;
  topic: string;
  message: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  admin_notes: string;
  created_at: string;
}

type TabType = 'applications' | 'universities' | 'users' | 'events' | 'consultations' | 'documents' | 'stats';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('applications');
  
  // Applications state
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddAppModal, setShowAddAppModal] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  
  // Universities state
  const [universities, setUniversities] = useState<University[]>([]);
  const [universitySearch, setUniversitySearch] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [showAddUniModal, setShowAddUniModal] = useState(false);
  const [editingUni, setEditingUni] = useState<University | null>(null);
  
  // Users state
  const [users, setUsers] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  // Events state
  const [events, setEvents] = useState<Event[]>([]);
  const [eventSearch, setEventSearch] = useState('');
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Consultations state
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [consultationSearch, setConsultationSearch] = useState('');
  const [consultationStatusFilter, setConsultationStatusFilter] = useState<string>('all');

  // Documents state
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [documentSearch, setDocumentSearch] = useState('');
  const [documentStatusFilter, setDocumentStatusFilter] = useState<string>('all');

  // User details modal
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [userDocuments, setUserDocuments] = useState<UserDocument[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    loadData();
  }, [user, navigate]);

  const loadData = () => {
    // Load Applications from API
    loadApplicationsFromAPI();

    // Load Events from API
    loadEventsFromAPI();

    // Load Consultations from API
    loadConsultationsFromAPI();

    // Load Documents from API
    loadDocumentsFromAPI();

    // Load Universities
    const storedUnis = localStorage.getItem('ketem_universities');
    if (storedUnis) {
      setUniversities(JSON.parse(storedUnis));
    } else {
      const demoUnis: University[] = [
        // Италия
        {
          id: '1',
          name: 'Университет Болоньи (Università di Bologna)',
          nameEn: 'University of Bologna',
          country: 'Италия',
          city: 'Болонья',
          tuition: '1,000 - 3,500 EUR/год',
          programs: ['Право', 'Инженерия', 'Медицина', 'Искусство'],
          ranking: '#1 в Италии',
          image: 'https://images.unsplash.com/photo-1765646846614-24b72adbaf4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb2xvZ25hJTIwSXRhbHklMjB1bml2ZXJzaXR5JTIwaGlzdG9yaWN8ZW58MXx8fHwxNzY5Nzk2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
          description: 'Старейший университет Европы, основан в 1088 году'
        },
        {
          id: '2',
          name: 'Миланский политехнический университет (Politecnico di Milano)',
          nameEn: 'Polytechnic University of Milan',
          country: 'Италия',
          city: 'Милан',
          tuition: '900 - 3,900 EUR/год',
          programs: ['Инженерия', 'Архитектура', 'Дизайн', 'IT'],
          ranking: '#2 в Италии',
          image: 'https://images.unsplash.com/photo-1683902299114-82228e997414',
          description: 'Ведущий технический университет Италии'
        },
        {
          id: '3',
          name: 'Университет Сапиенца (Sapienza Università di Roma)',
          nameEn: 'Sapienza University of Rome',
          country: 'Италия',
          city: 'Рим',
          tuition: '1,000 - 3,000 EUR/год',
          programs: ['История', 'Философия', 'Медицина', 'Инженерия'],
          ranking: '#3 в Италии',
          image: 'https://images.unsplash.com/photo-1694206575111-761a6918afb0',
          description: 'Крупнейший университет Европы'
        },
        {
          id: '4',
          name: 'Университет Падуи (Università di Padova)',
          nameEn: 'University of Padua',
          country: 'Италия',
          city: 'Падуя',
          tuition: '800 - 2,700 EUR/год',
          programs: ['Медицина', 'Астрономия', 'Психология', 'Биология'],
          ranking: '#4 в Италии',
          image: 'https://images.unsplash.com/photo-1652987363933-ff541486927b',
          description: 'Основан в 1222 году, известен медицинским факультетом'
        },
        {
          id: '5',
          name: 'Миланский университет (Università degli Studi di Milano)',
          nameEn: 'University of Milan',
          country: 'Италия',
          city: 'Милан',
          tuition: '900 - 3,200 EUR/год',
          programs: ['Медицина', 'Право', 'Экономика', 'Науки'],
          ranking: '#5 в Италии',
          image: 'https://images.unsplash.com/photo-1657140556894-7628b12b77ba',
          description: 'Один из крупнейших университетов Италии'
        },
        {
          id: '6',
          name: 'Университет Пизы (Università di Pisa)',
          nameEn: 'University of Pisa',
          country: 'Италия',
          city: 'Пиза',
          tuition: '800 - 2,500 EUR/год',
          programs: ['Физика', 'Математика', 'Компьютерные науки', 'Инженерия'],
          ranking: '#6 в Италии',
          image: 'https://images.unsplash.com/photo-1641689853367-2fc7dd36a3e6',
          description: 'Основан в 1343 году, известен естественными науками'
        },
        // Чехия
        {
          id: '7',
          name: 'Карлов университет (Univerzita Karlova)',
          nameEn: 'Charles University',
          country: 'Чехия',
          city: 'Прага',
          tuition: 'Бесплатно на чешском / €4,000-8,000 на английском',
          programs: ['Медицина', 'Право', 'Естественные науки', 'Гуманитарные науки'],
          ranking: '#1 в Чехии',
          image: 'https://images.unsplash.com/photo-1766226083712-be8e02074247',
          description: 'Старейший университет Центральной Европы (основан в 1348)'
        },
        {
          id: '8',
          name: 'Чешский технический университет (ČVUT)',
          nameEn: 'Czech Technical University',
          country: 'Чехия',
          city: 'Прага',
          tuition: 'Бесплатно на чешском / €3,000-7,000 на английском',
          programs: ['Инженерия', 'IT', 'Архитектура', 'Транспорт'],
          ranking: '#2 в Чехии',
          image: 'https://images.unsplash.com/photo-1766226083712-be8e02074247',
          description: 'Ведущий технический университет Чехии'
        },
        {
          id: '9',
          name: 'Технический университет Брно (VUT)',
          nameEn: 'Brno University of Technology',
          country: 'Чехия',
          city: 'Брно',
          tuition: 'Бесплатно на чешском / €2,500-6,000 на английском',
          programs: ['Машиностроение', 'Электротехника', 'IT', 'Бизнес'],
          ranking: '#3 в Чехии',
          image: 'https://images.unsplash.com/photo-1611864051900-26bbdb68205d',
          description: 'Крупнейший технический университет Моравии'
        },
        {
          id: '10',
          name: 'Университет Масарика (Masarykova univerzita)',
          nameEn: 'Masaryk University',
          country: 'Чехия',
          city: 'Брно',
          tuition: 'Бесплатно на чешском / €3,500-6,500 на английском',
          programs: ['Медицина', 'Право', 'Экономика', 'IT'],
          ranking: '#4 в Чехии',
          image: 'https://images.unsplash.com/photo-1587590624341-f4e9ebfb2bb7',
          description: 'Второй по величине университет Чехии'
        },
        {
          id: '11',
          name: 'Университет экономики в Праге (VŠE)',
          nameEn: 'Prague University of Economics',
          country: 'Чехия',
          city: 'Прага',
          tuition: 'Бесплатно на чешском / €4,000-7,000 на английском',
          programs: ['Экономика', 'Бизнес', 'Менеджмент', 'Финансы'],
          ranking: '#1 в экономике',
          image: 'https://images.unsplash.com/photo-1605538794065-dd2671432ca7',
          description: 'Ведущий экономический университет Центральной Европы'
        },
        {
          id: '12',
          name: 'Университет Палацкого (Univerzita Palackého)',
          nameEn: 'Palacký University',
          country: 'Чехия',
          city: 'Оломоуц',
          tuition: 'Бесплатно на чешском / €2,000-5,000 на английском',
          programs: ['Медицина', 'Науки', 'Педагогика', 'Философия'],
          ranking: '#5 в Чехии',
          image: 'https://images.unsplash.com/photo-1609874933160-164e8c00489c',
          description: 'Второй старейший университет Чехии (основан в 1573)'
        },
        // Словакия
        {
          id: '13',
          name: 'Университет Коменского (Univerzita Komenského)',
          nameEn: 'Comenius University',
          country: 'Словакия',
          city: 'Братислава',
          tuition: 'Бесплатно на словацком / €2,000-5,000 на английском',
          programs: ['Медицина', 'Право', 'Естественные науки', 'Педагогика'],
          ranking: '#1 в Словакии',
          image: 'https://images.unsplash.com/photo-1716323334534-5d88e514efd4',
          description: 'Старейший и крупнейший университет Словакии'
        },
        {
          id: '14',
          name: 'Словацкий технический университет (STU)',
          nameEn: 'Slovak University of Technology',
          country: 'Словакия',
          city: 'Братислава',
          tuition: 'Бесплатно на словацком / €2,500-4,500 на английском',
          programs: ['Инженерия', 'IT', 'Архитектура', 'Машиностроение'],
          ranking: '#2 в Словакии',
          image: 'https://images.unsplash.com/photo-1715929345251-90d6cc324508',
          description: 'Ведущий технический университет Словакии'
        },
        {
          id: '15',
          name: 'Университет Павла Йозефа Шафарика',
          nameEn: 'Pavol Jozef Šafárik University',
          country: 'Словакия',
          city: 'Кошице',
          tuition: 'Бесплатно на словацком / €2,000-4,000 на английском',
          programs: ['Медицина', 'Право', 'Науки', 'Философия'],
          ranking: '#3 в Словакии',
          image: 'https://images.unsplash.com/photo-1738686001611-39b03de57797',
          description: 'Второй по величине университет Словакии'
        },
        {
          id: '16',
          name: 'Технический университет Кошице (TUKE)',
          nameEn: 'Technical University of Košice',
          country: 'Словакия',
          city: 'Кошице',
          tuition: 'Бесплатно на словацком / €2,200-4,200 на английском',
          programs: ['Электротехника', 'IT', 'Инженерия', 'Экономика'],
          ranking: '#4 в Словакии',
          image: 'https://images.unsplash.com/photo-1738686001611-39b03de57797',
          description: 'Ведущий технический университет восточной Словакии'
        },
        {
          id: '17',
          name: 'Университет экономики в Братиславе',
          nameEn: 'University of Economics in Bratislava',
          country: 'Словакия',
          city: 'Братислава',
          tuition: 'Бесплатно на словацком / €3,000-5,000 на английском',
          programs: ['Экономика', 'Бизнес', 'Менеджмент', 'Финансы'],
          ranking: '#1 в экономике',
          image: 'https://images.unsplash.com/photo-1747679436612-48470dda04b5',
          description: 'Старейший экономический университет Словакии'
        },
        {
          id: '18',
          name: 'Университет Матея Бела',
          nameEn: 'Matej Bel University',
          country: 'Словакия',
          city: 'Банска-Бистрица',
          tuition: 'Бесплатно на словацком / €1,800-3,500 на английском',
          programs: ['Педагогика', 'Гуманитарные науки', 'Экономика', 'Право'],
          ranking: '#5 в Словакии',
          image: 'https://images.unsplash.com/photo-1724672354075-4cc1deaadc99',
          description: 'Университет в центре Словакии с сильными педагогическими программами'
        }
      ];
      setUniversities(demoUnis);
      localStorage.setItem('ketem_universities', JSON.stringify(demoUnis));
    }

    // Load Users from API
    loadUsersFromAPI();
  };

  const loadUsersFromAPI = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success && data.data?.users) {
        const mappedUsers: User[] = data.data.users.map((u: any) => ({
          id: u.id.toString(),
          email: u.email,
          name: u.name,
          role: u.role,
          registeredDate: u.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          status: u.is_active ? 'active' : 'blocked',
          phone: u.phone || '',
          country: u.country || '',
          date_of_birth: u.date_of_birth?.split('T')[0] || ''
        }));
        setUsers(mappedUsers);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const loadDocumentsFromAPI = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/documents', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success && data.data) {
        setDocuments(data.data);
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  };

  const loadUserDocuments = async (userId: string) => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch(`http://localhost:3000/api/documents?user_id=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success && data.data) {
        setUserDocuments(data.data);
      }
    } catch (error) {
      console.error('Failed to load user documents:', error);
    }
  };

  const loadApplicationsFromAPI = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/applications', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success && data.data?.applications) {
        const mappedApps: Application[] = data.data.applications.map((app: any) => ({
          id: app.id.toString(),
          studentName: app.full_name || app.user_name || 'Не указано',
          studentEmail: app.email || 'Не указано',
          university: app.university || 'Не указано',
          country: app.country_preference || 'Не указано',
          program: app.program_type || 'Не указано',
          status: app.status === 'reviewing' ? 'pending' : app.status,
          date: app.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          notes: app.admin_notes || ''
        }));
        setApplications(mappedApps);
      }
    } catch (error) {
      console.error('Failed to load applications:', error);
    }
  };

  const loadEventsFromAPI = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/events', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success && data.data) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const loadConsultationsFromAPI = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/consultations', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success && data.data) {
        setConsultations(data.data);
      }
    } catch (error) {
      console.error('Failed to load consultations:', error);
    }
  };

  // Consultations handlers
  const handleConsultationStatusChange = async (id: string, newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch(`http://localhost:3000/api/consultations/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setConsultations(consultations.map(c =>
          c.id === id ? { ...c, status: newStatus } : c
        ));
      }
    } catch (error) {
      console.error('Failed to update consultation status:', error);
    }
  };

  const handleDeleteConsultation = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту заявку на консультацию?')) {
      try {
        const token = localStorage.getItem('ketem_token');
        const response = await fetch(`http://localhost:3000/api/consultations/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setConsultations(consultations.filter(c => c.id !== id));
        }
      } catch (error) {
        console.error('Failed to delete consultation:', error);
      }
    }
  };

  // Documents handlers
  const handleDocumentStatusChange = async (id: string, newStatus: 'pending' | 'approved' | 'rejected', notes?: string) => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch(`http://localhost:3000/api/documents/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus, admin_notes: notes || '' })
      });

      if (response.ok) {
        setDocuments(documents.map(d =>
          d.id === id ? { ...d, status: newStatus, admin_notes: notes || '' } : d
        ));
        // Also update in user documents if modal is open
        setUserDocuments(userDocuments.map(d =>
          d.id === id ? { ...d, status: newStatus, admin_notes: notes || '' } : d
        ));
      }
    } catch (error) {
      console.error('Failed to update document status:', error);
    }
  };

  const handleViewUserDetails = async (user: User) => {
    setSelectedUser(user);
    await loadUserDocuments(user.id);
    setShowUserDetailsModal(true);
  };

  const handleDownloadDocument = async (docId: string, originalName: string) => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch(`http://localhost:3000/api/documents/download/${docId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = originalName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    } catch (error) {
      console.error('Failed to download document:', error);
    }
  };

  // Events handlers
  const handleCreateEvent = async (event: Omit<Event, 'id'>) => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      if (response.ok) {
        loadEventsFromAPI();
        setShowAddEventModal(false);
      }
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const handleUpdateEvent = async (id: string, event: Partial<Event>) => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch(`http://localhost:3000/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      if (response.ok) {
        loadEventsFromAPI();
        setEditingEvent(null);
      }
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить это событие?')) {
      try {
        const token = localStorage.getItem('ketem_token');
        const response = await fetch(`http://localhost:3000/api/events/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setEvents(events.filter(e => e.id !== id));
        }
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    }
  };

  const handleSaveEvent = (event: Event | Omit<Event, 'id'>) => {
    if ('id' in event) {
      handleUpdateEvent(event.id, event);
    } else {
      handleCreateEvent(event);
    }
  };

  // Applications handlers
  const handleDeleteApp = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту заявку?')) {
      try {
        const token = localStorage.getItem('ketem_token');
        const response = await fetch(`http://localhost:3000/api/applications/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setApplications(applications.filter(app => app.id !== id));
        }
      } catch (error) {
        console.error('Failed to delete application:', error);
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch(`http://localhost:3000/api/applications/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setApplications(applications.map(app =>
          app.id === id ? { ...app, status: newStatus } : app
        ));
      }
    } catch (error) {
      console.error('Failed to update application status:', error);
    }
  };

  const handleSaveApp = (app: Application | Omit<Application, 'id'>) => {
    // Note: Creating applications is done by students, admins only update status
    if ('id' in app) {
      handleStatusChange(app.id, app.status);
      setEditingApp(null);
    }
    setShowAddAppModal(false);
  };

  // Universities handlers
  const saveUniversities = (unis: University[]) => {
    setUniversities(unis);
    localStorage.setItem('ketem_universities', JSON.stringify(unis));
  };

  const handleDeleteUni = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот университет?')) {
      const updatedUnis = universities.filter(uni => uni.id !== id);
      saveUniversities(updatedUnis);
    }
  };

  const handleSaveUni = (uni: University | Omit<University, 'id'>) => {
    if ('id' in uni) {
      const updatedUnis = universities.map(u => u.id === uni.id ? uni : u);
      saveUniversities(updatedUnis);
      setEditingUni(null);
    } else {
      const newUni: University = { ...uni, id: Date.now().toString() };
      saveUniversities([...universities, newUni]);
      setShowAddUniModal(false);
    }
  };

  // Users handlers
  const handleUserStatusToggle = async (id: string) => {
    const user = users.find(u => u.id === id);
    if (!user) return;

    const newStatus = user.status === 'active' ? false : true;

    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_active: newStatus })
      });

      if (response.ok) {
        setUsers(users.map(u =>
          u.id === id ? { ...u, status: newStatus ? 'active' : 'blocked' } : u
        ));
      }
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  const handleUserRoleChange = async (id: string, newRole: 'student' | 'admin') => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });

      if (response.ok) {
        setUsers(users.map(u =>
          u.id === id ? { ...u, role: newRole } : u
        ));
      }
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  // Filtering
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = 
      uni.name.toLowerCase().includes(universitySearch.toLowerCase()) ||
      uni.nameEn.toLowerCase().includes(universitySearch.toLowerCase()) ||
      uni.city.toLowerCase().includes(universitySearch.toLowerCase());
    const matchesCountry = countryFilter === 'all' || uni.country === countryFilter;
    return matchesSearch && matchesCountry;
  });

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredConsultations = consultations.filter(c => {
    const matchesSearch =
      c.user_name.toLowerCase().includes(consultationSearch.toLowerCase()) ||
      c.user_email.toLowerCase().includes(consultationSearch.toLowerCase()) ||
      c.topic.toLowerCase().includes(consultationSearch.toLowerCase());
    const matchesStatus = consultationStatusFilter === 'all' || c.status === consultationStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredDocuments = documents.filter(d => {
    const matchesSearch =
      d.user_name?.toLowerCase().includes(documentSearch.toLowerCase()) ||
      d.user_email?.toLowerCase().includes(documentSearch.toLowerCase()) ||
      d.original_name?.toLowerCase().includes(documentSearch.toLowerCase());
    const matchesStatus = documentStatusFilter === 'all' || d.status === documentStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    applications: {
      total: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      approved: applications.filter(app => app.status === 'approved').length,
      rejected: applications.filter(app => app.status === 'rejected').length
    },
    universities: {
      total: universities.length,
      byCountry: universities.reduce((acc, uni) => {
        acc[uni.country] = (acc[uni.country] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    },
    users: {
      total: users.length,
      students: users.filter(u => u.role === 'student').length,
      admins: users.filter(u => u.role === 'admin').length,
      active: users.filter(u => u.status === 'active').length,
      blocked: users.filter(u => u.status === 'blocked').length
    },
    consultations: {
      total: consultations.length,
      pending: consultations.filter(c => c.status === 'pending').length,
      confirmed: consultations.filter(c => c.status === 'confirmed').length,
      completed: consultations.filter(c => c.status === 'completed').length,
      cancelled: consultations.filter(c => c.status === 'cancelled').length
    },
    documents: {
      total: documents.length,
      pending: documents.filter(d => d.status === 'pending').length,
      approved: documents.filter(d => d.status === 'approved').length,
      rejected: documents.filter(d => d.status === 'rejected').length
    }
  };

  const tabs = [
    { id: 'applications' as const, label: 'Заявки', icon: FileText, count: stats.applications.total },
    { id: 'consultations' as const, label: 'Консультации', icon: Phone, count: stats.consultations.total },
    { id: 'documents' as const, label: 'Документы', icon: File, count: stats.documents.pending },
    { id: 'universities' as const, label: 'Университеты', icon: GraduationCap, count: stats.universities.total },
    { id: 'users' as const, label: 'Пользователи', icon: Users, count: stats.users.total },
    { id: 'events' as const, label: 'События', icon: Calendar, count: events.length },
    { id: 'stats' as const, label: 'Статистика', icon: BarChart3, count: null }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Админ-панель</h1>
          <p className="text-gray-600">Полное управление платформой KETEM edu</p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'applications' && (
            <ApplicationsTab
              applications={filteredApplications}
              stats={stats.applications}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onAdd={() => setShowAddAppModal(true)}
              onEdit={setEditingApp}
              onDelete={handleDeleteApp}
              onStatusChange={handleStatusChange}
            />
          )}

          {activeTab === 'universities' && (
            <UniversitiesTab
              universities={filteredUniversities}
              stats={stats.universities}
              searchTerm={universitySearch}
              setSearchTerm={setUniversitySearch}
              countryFilter={countryFilter}
              setCountryFilter={setCountryFilter}
              onAdd={() => setShowAddUniModal(true)}
              onEdit={setEditingUni}
              onDelete={handleDeleteUni}
            />
          )}

          {activeTab === 'users' && (
            <UsersTab
              users={filteredUsers}
              stats={stats.users}
              searchTerm={userSearch}
              setSearchTerm={setUserSearch}
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
              onStatusToggle={handleUserStatusToggle}
              onRoleChange={handleUserRoleChange}
              onViewDetails={handleViewUserDetails}
            />
          )}

          {activeTab === 'documents' && (
            <DocumentsTab
              documents={filteredDocuments}
              stats={stats.documents}
              searchTerm={documentSearch}
              setSearchTerm={setDocumentSearch}
              statusFilter={documentStatusFilter}
              setStatusFilter={setDocumentStatusFilter}
              onStatusChange={handleDocumentStatusChange}
              onDownload={handleDownloadDocument}
            />
          )}

          {activeTab === 'consultations' && (
            <ConsultationsTab
              consultations={filteredConsultations}
              stats={stats.consultations}
              searchTerm={consultationSearch}
              setSearchTerm={setConsultationSearch}
              statusFilter={consultationStatusFilter}
              setStatusFilter={setConsultationStatusFilter}
              onStatusChange={handleConsultationStatusChange}
              onDelete={handleDeleteConsultation}
            />
          )}

          {activeTab === 'events' && (
            <EventsTab
              events={events.filter(e =>
                e.title.toLowerCase().includes(eventSearch.toLowerCase())
              )}
              searchTerm={eventSearch}
              setSearchTerm={setEventSearch}
              onAdd={() => setShowAddEventModal(true)}
              onEdit={setEditingEvent}
              onDelete={handleDeleteEvent}
            />
          )}

          {activeTab === 'stats' && (
            <StatsTab stats={stats} applications={applications} />
          )}
        </motion.div>
      </div>

      {/* Modals */}
      {(showAddAppModal || editingApp) && (
        <ApplicationModal
          application={editingApp}
          onClose={() => {
            setShowAddAppModal(false);
            setEditingApp(null);
          }}
          onSave={handleSaveApp}
        />
      )}

      {(showAddUniModal || editingUni) && (
        <UniversityModal
          university={editingUni}
          onClose={() => {
            setShowAddUniModal(false);
            setEditingUni(null);
          }}
          onSave={handleSaveUni}
        />
      )}

      {(showAddEventModal || editingEvent) && (
        <EventModal
          event={editingEvent}
          onClose={() => {
            setShowAddEventModal(false);
            setEditingEvent(null);
          }}
          onSave={handleSaveEvent}
        />
      )}

      {showUserDetailsModal && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          documents={userDocuments}
          onClose={() => {
            setShowUserDetailsModal(false);
            setSelectedUser(null);
            setUserDocuments([]);
          }}
          onDocumentStatusChange={handleDocumentStatusChange}
          onDownload={handleDownloadDocument}
        />
      )}

      {/* Private Chat Widget */}
      {user && (
        <PrivateChat
          currentUserId={user.id}
          currentUserName={user.name}
          currentUserRole="admin"
        />
      )}
    </div>
  );
};

// Applications Tab Component
interface ApplicationsTabProps {
  applications: Application[];
  stats: any;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  onAdd: () => void;
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
}

const ApplicationsTab: React.FC<ApplicationsTabProps> = ({
  applications,
  stats,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onAdd,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-500 to-amber-500 text-white p-6 rounded-xl shadow-lg"
        >
          <FileText className="w-10 h-10 mb-3 opacity-80" />
          <p className="text-sm opacity-90">Всего заявок</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-yellow-500 to-amber-500 text-white p-6 rounded-xl shadow-lg"
        >
          <Clock className="w-10 h-10 mb-3 opacity-80" />
          <p className="text-sm opacity-90">В обработке</p>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-lg"
        >
          <CheckCircle className="w-10 h-10 mb-3 opacity-80" />
          <p className="text-sm opacity-90">Одобрено</p>
          <p className="text-3xl font-bold">{stats.approved}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-red-500 to-rose-500 text-white p-6 rounded-xl shadow-lg"
        >
          <XCircle className="w-10 h-10 mb-3 opacity-80" />
          <p className="text-sm opacity-90">Отклонено</p>
          <p className="text-3xl font-bold">{stats.rejected}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по имени, университету или стране..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">Все статусы</option>
              <option value="pending">В обработке</option>
              <option value="approved">Одобрено</option>
              <option value="rejected">Отклонено</option>
            </select>

            <button
              onClick={onAdd}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              <span>Добавить</span>
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Студент
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Университет
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Программа
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map(app => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{app.studentName}</div>
                      <div className="text-sm text-gray-500">{app.studentEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{app.university}</div>
                      <div className="text-sm text-gray-500">{app.country}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={app.status}
                      onChange={(e) => onStatusChange(app.id, e.target.value as any)}
                      className={`text-xs px-3 py-1 rounded-full font-medium border-0 focus:ring-2 focus:ring-orange-500 ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="pending">В обработке</option>
                      <option value="approved">Одобрено</option>
                      <option value="rejected">Отклонено</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(app.date).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onEdit(app)}
                        className="text-orange-600 hover:text-orange-900 transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDelete(app.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {applications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Заявки не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Universities Tab Component
interface UniversitiesTabProps {
  universities: University[];
  stats: any;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  countryFilter: string;
  setCountryFilter: (filter: string) => void;
  onAdd: () => void;
  onEdit: (uni: University) => void;
  onDelete: (id: string) => void;
}

const UniversitiesTab: React.FC<UniversitiesTabProps> = ({
  universities,
  stats,
  searchTerm,
  setSearchTerm,
  countryFilter,
  setCountryFilter,
  onAdd,
  onEdit,
  onDelete
}) => {
  const countries = ['Китай', 'Италия', 'Чехия', 'Словакия'];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-500 to-amber-500 text-white p-6 rounded-xl shadow-lg"
        >
          <GraduationCap className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-90">Всего</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </motion.div>

        {countries.map((country, idx) => (
          <motion.div
            key={country}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (idx + 1) * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100"
          >
            <Globe className="w-8 h-8 mb-2 text-orange-500" />
            <p className="text-sm text-gray-600">{country}</p>
            <p className="text-2xl font-bold text-gray-900">{stats.byCountry[country] || 0}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск университетов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">Все страны</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            <button
              onClick={onAdd}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              <span>Добавить</span>
            </button>
          </div>
        </div>
      </div>

      {/* Universities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((uni, idx) => (
          <motion.div
            key={uni.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-40">
              <img
                src={uni.image}
                alt={uni.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                {uni.ranking}
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-lg mb-1 text-gray-900 line-clamp-1">{uni.name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-1">{uni.nameEn}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>{uni.city}, {uni.country}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">{uni.tuition}</span>
                </div>
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                {uni.programs.slice(0, 3).map((prog, i) => (
                  <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                    {prog}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(uni)}
                  className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => onDelete(uni.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {universities.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Университеты не найдены</p>
        </div>
      )}
    </div>
  );
};

// Consultations Tab Component
interface ConsultationsTabProps {
  consultations: Consultation[];
  stats: any;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  onStatusChange: (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => void;
  onDelete: (id: string) => void;
}

const ConsultationsTab: React.FC<ConsultationsTabProps> = ({
  consultations,
  stats,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onStatusChange,
  onDelete
}) => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Ожидает</span>;
      case 'confirmed':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Подтверждено</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Завершено</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Отменено</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-500 to-amber-500 text-white p-4 rounded-xl shadow-lg"
        >
          <Phone className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-xs opacity-90">Всего</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-yellow-500 to-amber-500 text-white p-4 rounded-xl shadow-lg"
        >
          <Clock className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-xs opacity-90">Ожидает</p>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-4 rounded-xl shadow-lg"
        >
          <CheckCircle className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-xs opacity-90">Подтверждено</p>
          <p className="text-2xl font-bold">{stats.confirmed}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-4 rounded-xl shadow-lg"
        >
          <CheckCircle className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-xs opacity-90">Завершено</p>
          <p className="text-2xl font-bold">{stats.completed}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-red-500 to-rose-500 text-white p-4 rounded-xl shadow-lg"
        >
          <XCircle className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-xs opacity-90">Отменено</p>
          <p className="text-2xl font-bold">{stats.cancelled}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по имени, email или теме..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Все статусы</option>
            <option value="pending">Ожидает</option>
            <option value="confirmed">Подтверждено</option>
            <option value="completed">Завершено</option>
            <option value="cancelled">Отменено</option>
          </select>
        </div>
      </div>

      {/* Consultations Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Пользователь
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата и время
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Тема
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {consultations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Phone className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Нет заявок на консультацию</p>
                  </td>
                </tr>
              ) : (
                consultations.map((consultation) => (
                  <tr key={consultation.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{consultation.user_name}</p>
                        <p className="text-sm text-gray-500">{consultation.user_email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">
                          {new Date(consultation.consultation_date).toLocaleDateString('ru-RU')}
                        </p>
                        <p className="text-sm text-gray-500">{consultation.consultation_time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{getTopicLabel(consultation.topic)}</p>
                      {consultation.message && (
                        <p className="text-sm text-gray-500 truncate max-w-xs">{consultation.message}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(consultation.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <select
                          value={consultation.status}
                          onChange={(e) => onStatusChange(consultation.id, e.target.value as any)}
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="pending">Ожидает</option>
                          <option value="confirmed">Подтверждено</option>
                          <option value="completed">Завершено</option>
                          <option value="cancelled">Отменено</option>
                        </select>
                        <button
                          onClick={() => onDelete(consultation.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Users Tab Component
interface UsersTabProps {
  users: User[];
  stats: any;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  roleFilter: string;
  setRoleFilter: (filter: string) => void;
  onStatusToggle: (id: string) => void;
  onRoleChange: (id: string, role: 'student' | 'admin') => void;
  onViewDetails: (user: User) => void;
}

const UsersTab: React.FC<UsersTabProps> = ({
  users,
  stats,
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  onStatusToggle,
  onRoleChange,
  onViewDetails
}) => {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Всего', value: stats.total, color: 'from-orange-500 to-amber-500', icon: Users },
          { label: 'Студенты', value: stats.students, color: 'from-blue-500 to-cyan-500', icon: GraduationCap },
          { label: 'Админы', value: stats.admins, color: 'from-purple-500 to-pink-500', icon: Shield },
          { label: 'Активные', value: stats.active, color: 'from-green-500 to-emerald-500', icon: CheckCircle }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} text-white p-6 rounded-xl shadow-lg`}
            >
              <Icon className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-sm opacity-90">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск пользователей..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Все роли</option>
            <option value="student">Студенты</option>
            <option value="admin">Админы</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Пользователь
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Роль
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата регистрации
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{u.name}</div>
                      <div className="text-sm text-gray-500">{u.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={u.role}
                      onChange={(e) => onRoleChange(u.id, e.target.value as any)}
                      className={`text-xs px-3 py-1 rounded-full font-medium border-0 focus:ring-2 focus:ring-orange-500 ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      <option value="student">Студент</option>
                      <option value="admin">Админ</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(u.registeredDate).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      u.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {u.status === 'active' ? 'Активен' : 'Заблокирован'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onViewDetails(u)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Подробнее"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onStatusToggle(u.id)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          u.status === 'active'
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {u.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Documents Tab Component
interface DocumentsTabProps {
  documents: UserDocument[];
  stats: any;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  onStatusChange: (id: string, status: 'pending' | 'approved' | 'rejected', notes?: string) => void;
  onDownload: (id: string, name: string) => void;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({
  documents,
  stats,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onStatusChange,
  onDownload
}) => {
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Всего', value: stats.total, color: 'from-orange-500 to-amber-500', icon: File },
          { label: 'На проверке', value: stats.pending, color: 'from-yellow-500 to-amber-500', icon: Clock },
          { label: 'Одобрено', value: stats.approved, color: 'from-green-500 to-emerald-500', icon: CheckCircle },
          { label: 'Отклонено', value: stats.rejected, color: 'from-red-500 to-rose-500', icon: XCircle }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} text-white p-6 rounded-xl shadow-lg`}
            >
              <Icon className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-sm opacity-90">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по имени, email или файлу..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Все статусы</option>
            <option value="pending">На проверке</option>
            <option value="approved">Одобрено</option>
            <option value="rejected">Отклонено</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Пользователь
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Документ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Тип
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Размер
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map(doc => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{doc.user_name}</div>
                      <div className="text-sm text-gray-500">{doc.user_email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={doc.original_name}>
                      {doc.original_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {getDocTypeName(doc.document_type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatFileSize(doc.file_size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(doc.created_at).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {doc.status === 'pending' ? 'На проверке' :
                       doc.status === 'approved' ? 'Одобрен' : 'Отклонен'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onDownload(doc.id, doc.original_name)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Скачать"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      {doc.status === 'pending' && (
                        <>
                          <button
                            onClick={() => onStatusChange(doc.id, 'approved')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Одобрить"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              const notes = prompt('Причина отклонения (необязательно):');
                              onStatusChange(doc.id, 'rejected', notes || '');
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Отклонить"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {doc.status !== 'pending' && (
                        <button
                          onClick={() => onStatusChange(doc.id, 'pending')}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Вернуть на проверку"
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {documents.length === 0 && (
            <div className="text-center py-12">
              <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Нет документов для отображения</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// User Details Modal Component
interface UserDetailsModalProps {
  user: User;
  documents: UserDocument[];
  onClose: () => void;
  onDocumentStatusChange: (id: string, status: 'pending' | 'approved' | 'rejected', notes?: string) => void;
  onDownload: (id: string, name: string) => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  documents,
  onClose,
  onDocumentStatusChange,
  onDownload
}) => {
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Информация о пользователе</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* User Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5 text-orange-500" />
              <span>Личные данные</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Имя</label>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium flex items-center space-x-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{user.email}</span>
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Телефон</label>
                <p className="font-medium flex items-center space-x-1">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{user.phone || <span className="text-gray-400 italic">Не указан</span>}</span>
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Страна</label>
                <p className="font-medium flex items-center space-x-1">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span>{user.country || <span className="text-gray-400 italic">Не указана</span>}</span>
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Дата рождения</label>
                <p className="font-medium flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>
                    {user.date_of_birth
                      ? new Date(user.date_of_birth).toLocaleDateString('ru-RU')
                      : <span className="text-gray-400 italic">Не указана</span>
                    }
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Дата регистрации</label>
                <p className="font-medium">
                  {new Date(user.registeredDate).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Роль</label>
                <p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role === 'admin' ? 'Админ' : 'Студент'}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Статус</label>
                <p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* User Documents */}
          <div>
            <h4 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-orange-500" />
              <span>Документы пользователя ({documents.length})</span>
            </h4>
            {documents.length > 0 ? (
              <div className="space-y-3">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">
                          {getDocTypeName(doc.document_type)}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {doc.status === 'pending' ? 'На проверке' :
                           doc.status === 'approved' ? 'Одобрен' : 'Отклонен'}
                        </span>
                      </div>
                      <p className="text-sm font-medium truncate" title={doc.original_name}>
                        {doc.original_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(doc.file_size)} • {new Date(doc.created_at).toLocaleDateString('ru-RU')}
                      </p>
                      {doc.admin_notes && (
                        <p className="text-xs text-red-600 mt-1">Примечание: {doc.admin_notes}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => onDownload(doc.id, doc.original_name)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Скачать"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      {doc.status === 'pending' && (
                        <>
                          <button
                            onClick={() => onDocumentStatusChange(doc.id, 'approved')}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                            title="Одобрить"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              const notes = prompt('Причина отклонения (необязательно):');
                              onDocumentStatusChange(doc.id, 'rejected', notes || '');
                            }}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Отклонить"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {doc.status !== 'pending' && (
                        <button
                          onClick={() => onDocumentStatusChange(doc.id, 'pending')}
                          className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors"
                          title="Вернуть на проверку"
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">У пользователя нет загруженных документов</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

// Stats Tab Component
interface StatsTabProps {
  stats: any;
  applications: Application[];
}

const StatsTab: React.FC<StatsTabProps> = ({ stats, applications }) => {
  // Calculate monthly applications
  const monthlyData = applications.reduce((acc, app) => {
    const month = new Date(app.date).toLocaleString('ru-RU', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate country distribution
  const countryData = applications.reduce((acc, app) => {
    acc[app.country] = (acc[app.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-xl shadow-lg">
        <BarChart3 className="w-12 h-12 mb-3 opacity-80" />
        <h2 className="text-3xl font-bold mb-2">Статистика платформы</h2>
        <p className="opacity-90">Общая аналитика и показатели эффективности</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <FileText className="w-10 h-10 text-orange-500 mb-3" />
          <p className="text-sm text-gray-600 mb-1">Всего заявок</p>
          <p className="text-4xl font-bold text-gray-900">{stats.applications.total}</p>
          <p className="text-sm text-green-600 mt-2">↑ Активность растёт</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <GraduationCap className="w-10 h-10 text-blue-500 mb-3" />
          <p className="text-sm text-gray-600 mb-1">Университеты</p>
          <p className="text-4xl font-bold text-gray-900">{stats.universities.total}</p>
          <p className="text-sm text-gray-500 mt-2">В каталоге</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <Users className="w-10 h-10 text-purple-500 mb-3" />
          <p className="text-sm text-gray-600 mb-1">Пользователи</p>
          <p className="text-4xl font-bold text-gray-900">{stats.users.total}</p>
          <p className="text-sm text-gray-500 mt-2">{stats.users.active} активных</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications by Month */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Заявки по месяцам</h3>
          <div className="space-y-3">
            {Object.entries(monthlyData).map(([month, count]) => (
              <div key={month}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{month}</span>
                  <span className="font-bold text-gray-900">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all"
                    style={{ width: `${(count / Math.max(...Object.values(monthlyData))) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications by Country */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Популярные страны</h3>
          <div className="space-y-3">
            {Object.entries(countryData)
              .sort((a, b) => b[1] - a[1])
              .map(([country, count]) => (
                <div key={country}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{country}</span>
                    <span className="font-bold text-gray-900">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                      style={{ width: `${(count / Math.max(...Object.values(countryData))) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Распределение статусов заявок</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'В обработке', value: stats.applications.pending, color: 'yellow', icon: Clock },
            { label: 'Одобрено', value: stats.applications.approved, color: 'green', icon: CheckCircle },
            { label: 'Отклонено', value: stats.applications.rejected, color: 'red', icon: XCircle }
          ].map(item => {
            const Icon = item.icon;
            const percentage = stats.applications.total > 0 
              ? Math.round((item.value / stats.applications.total) * 100) 
              : 0;
            
            return (
              <div key={item.label} className="text-center p-4 bg-gray-50 rounded-lg">
                <Icon className={`w-10 h-10 mx-auto mb-2 text-${item.color}-500`} />
                <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{item.value}</p>
                <p className="text-sm text-gray-500">{percentage}% от общего</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Application Modal Component
interface ApplicationModalProps {
  application: Application | null;
  onClose: () => void;
  onSave: (app: Application | Omit<Application, 'id'>) => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ application, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    studentName: application?.studentName || '',
    studentEmail: application?.studentEmail || '',
    university: application?.university || '',
    country: application?.country || '',
    program: application?.program || '',
    status: application?.status || 'pending' as const,
    date: application?.date || new Date().toISOString().split('T')[0],
    notes: application?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (application) {
      onSave({ ...formData, id: application.id });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {application ? 'Редактировать заявку' : 'Добавить заявку'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Имя студента *
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email студента *
                </label>
                <input
                  type="email"
                  value={formData.studentEmail}
                  onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Университет *
                </label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Страна *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="">Выберите страну</option>
                  <option value="Китай">Китай</option>
                  <option value="Италия">Италия</option>
                  <option value="Чехия">Чехия</option>
                  <option value="Словакия">Словакия</option>
                  <option value="США">США</option>
                  <option value="Великобритания">Великобритания</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Программа *
                </label>
                <input
                  type="text"
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Статус *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="pending">В обработке</option>
                  <option value="approved">Одобрено</option>
                  <option value="rejected">Отклонено</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дата подачи *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Заметки
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Дополнительная информация о заявке..."
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {application ? 'Сохранить' : 'Добавить'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// University Modal Component
interface UniversityModalProps {
  university: University | null;
  onClose: () => void;
  onSave: (uni: University | Omit<University, 'id'>) => void;
}

const UniversityModal: React.FC<UniversityModalProps> = ({ university, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: university?.name || '',
    nameEn: university?.nameEn || '',
    country: university?.country || '',
    city: university?.city || '',
    tuition: university?.tuition || '',
    programs: university?.programs.join(', ') || '',
    ranking: university?.ranking || '',
    image: university?.image || '',
    description: university?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const uniData = {
      ...formData,
      programs: formData.programs.split(',').map(p => p.trim()).filter(p => p)
    };
    
    if (university) {
      onSave({ ...uniData, id: university.id });
    } else {
      onSave(uniData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {university ? 'Редактировать университет' : 'Добавить университет'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название (рус) *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название (англ) *
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Страна *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="">Выберите страну</option>
                  <option value="Китай">Китай</option>
                  <option value="Италия">Италия</option>
                  <option value="Чехия">Чехия</option>
                  <option value="Словакия">Словакия</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Город *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Стоимость *
                </label>
                <input
                  type="text"
                  value={formData.tuition}
                  onChange={(e) => setFormData({ ...formData, tuition: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="напр. 4,000 - 6,000 USD/год"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Рейтинг *
                </label>
                <input
                  type="text"
                  value={formData.ranking}
                  onChange={(e) => setFormData({ ...formData, ranking: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="напр. #1 в Китае"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Программы * <span className="text-xs text-gray-500">(через запятую)</span>
              </label>
              <input
                type="text"
                value={formData.programs}
                onChange={(e) => setFormData({ ...formData, programs: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Компьютерные науки, Бизнес, Инженерия"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL изображения *
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="https://..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Краткое описание университета..."
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {university ? 'Сохранить' : 'Добавить'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// Events Tab Component
interface EventsTabProps {
  events: Event[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAdd: () => void;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventsTab: React.FC<EventsTabProps> = ({
  events,
  searchTerm,
  setSearchTerm,
  onAdd,
  onEdit,
  onDelete
}) => {
  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'webinar': return 'Вебинар';
      case 'open_day': return 'День открытых дверей';
      case 'consultation': return 'Консультация';
      default: return 'Другое';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Поиск событий..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          <Plus className="w-4 h-4" />
          Добавить событие
        </button>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Название</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Тип</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Формат</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{event.title}</div>
                    {event.description && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">{event.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {getEventTypeLabel(event.event_type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(event.event_date)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      event.is_online ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {event.is_online ? 'Онлайн' : 'Офлайн'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      event.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {event.is_active ? 'Активно' : 'Скрыто'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => onEdit(event)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(event.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Нет событий</p>
                    <button
                      onClick={onAdd}
                      className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
                    >
                      Добавить первое событие
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Event Modal Component
interface EventModalProps {
  event: Event | null;
  onClose: () => void;
  onSave: (event: Event | Omit<Event, 'id'>) => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    event_date: event?.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : '',
    event_type: event?.event_type || 'webinar',
    location: event?.location || '',
    is_online: event?.is_online ?? true,
    link: event?.link || '',
    is_active: event?.is_active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (event) {
      onSave({ ...formData, id: event.id } as Event);
    } else {
      onSave(formData as Omit<Event, 'id'>);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {event ? 'Редактировать событие' : 'Добавить событие'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Дата и время *</label>
                <input
                  type="datetime-local"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Тип события</label>
                <select
                  value={formData.event_type}
                  onChange={(e) => setFormData({ ...formData, event_type: e.target.value as Event['event_type'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="webinar">Вебинар</option>
                  <option value="open_day">День открытых дверей</option>
                  <option value="consultation">Консультация</option>
                  <option value="other">Другое</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_online}
                  onChange={(e) => setFormData({ ...formData, is_online: e.target.checked })}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Онлайн</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Активно</span>
              </label>
            </div>

            {formData.is_online && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ссылка на событие</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="https://..."
                />
              </div>
            )}

            {!formData.is_online && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Место проведения</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Адрес..."
                />
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {event ? 'Сохранить' : 'Добавить'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
