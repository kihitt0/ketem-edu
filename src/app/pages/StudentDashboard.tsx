import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';
import { PrivateChat } from '@/app/components/PrivateChat';
import { LiveChat } from '@/app/components/LiveChat';
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
  Save,
  Map,
  FolderOpen,
  Sparkles,
  BarChart2,
  LogOut,
  Brain,
  Heart,
  Target,
  Star,
  Send,
  Check,
  Lock,
  TrendingUp,
  Bell,
  Shield
} from 'lucide-react';

const ACCENT = '#FF6B35';
const ACCENT2 = '#FFB800';

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

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'active' | 'locked';
  action?: string;
}

// ─── AI PLAN MODAL ────────────────────────────────────────────────────────────
const AIPlanModal: React.FC<{ onClose: () => void; userName: string }> = ({ onClose, userName }) => {
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState('');
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => { generatePlan(); }, []);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: `Составь персональный план поступления в зарубежный университет для студента по имени ${userName}. Учитывай направления: Европа (Чехия, Словакия, Италия), Китай. Сделай план с 5 конкретными этапами и сроками. Используй emoji. Отвечай на русском языке. Будь дружелюбным.` }]
        })
      });
      const data = await res.json();
      setPlan(data.content?.[0]?.text || 'Не удалось сгенерировать план.');
    } catch { setPlan('⚠️ Не удалось подключиться к AI. Попробуйте позже.'); }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setChatLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 600,
          messages: [{ role: 'user', content: `Ты AI-советник по поступлению за рубеж. Студент: ${userName}. Вопрос: ${input}. Отвечай по-русски, кратко.` }]
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.content?.[0]?.text || '...' }]);
    } catch { setMessages(prev => [...prev, { role: 'ai', text: 'Ошибка соединения.' }]); }
    setChatLoading(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 680, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sparkles size={22} color="#fff" />
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>AI Персональный план</span>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, padding: '4px 8px', cursor: 'pointer', color: '#fff' }}><X size={18} /></button>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, padding: 24 }}>
          <div style={{ background: '#F8F7FF', borderRadius: 12, padding: 20, marginBottom: 20, border: `1px solid ${ACCENT}22` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Brain size={18} color={ACCENT} />
              <span style={{ fontWeight: 600, color: '#1a1a2e' }}>Твой персональный маршрут</span>
            </div>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#888' }}>
                <div style={{ width: 20, height: 20, border: `2px solid ${ACCENT}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <span>AI составляет план специально для тебя...</span>
              </div>
            ) : (
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, color: '#333', fontSize: 14 }}>{plan}</div>
            )}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: '#1a1a2e', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <MessageCircle size={16} color={ACCENT} /> Спроси AI-советника
            </div>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
                <div style={{ background: m.role === 'user' ? ACCENT : '#F0EEFF', color: m.role === 'user' ? '#fff' : '#333', borderRadius: 12, padding: '8px 14px', maxWidth: '80%', fontSize: 14, lineHeight: 1.6 }}>{m.text}</div>
              </div>
            ))}
            {chatLoading && (
              <div style={{ display: 'flex', gap: 4, padding: '8px 14px', background: '#F0EEFF', borderRadius: 12, width: 'fit-content' }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, animation: `bounce 1s ${i * 0.2}s infinite` }} />)}
              </div>
            )}
          </div>
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid #eee', display: 'flex', gap: 10 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Спроси о поступлении, документах, сроках..." style={{ flex: 1, border: '1.5px solid #e0e0e0', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none' }} />
          <button onClick={sendMessage} style={{ background: ACCENT, border: 'none', borderRadius: 10, padding: '10px 16px', cursor: 'pointer', color: '#fff' }}><Send size={16} /></button>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
    </div>
  );
};

// ─── PSYCH TEST MODAL ─────────────────────────────────────────────────────────
const PsychTestModal: React.FC<{ onClose: () => void; onComplete: () => void }> = ({ onClose, onComplete }) => {
  const questions = [
    { q: 'Как ты относишься к переезду в другую страну?', options: ['Очень воодушевлён', 'Немного волнуюсь', 'Сильно беспокоюсь', 'Не определился'] },
    { q: 'Как ты справляешься со стрессом?', options: ['Легко', 'С трудом но справляюсь', 'Мне нужна поддержка', 'Избегаю стресса'] },
    { q: 'Твоя мотивация для учёбы за рубежом?', options: ['Карьера', 'Новый опыт', 'Образование', 'Семья/друзья'] },
  ];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const selectAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (step < questions.length - 1) { setStep(step + 1); }
    else { analyzeResults(newAnswers); }
  };

  const analyzeResults = async (ans: number[]) => {
    setLoading(true);
    const summary = questions.map((q, i) => `${q.q} → ${q.options[ans[i]]}`).join('\n');
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          messages: [{ role: 'user', content: `Психологическая поддержка для студента, поступающего за рубеж. Ответы:\n${summary}\n\nДай тёплую поддерживающую обратную связь. Укажи сильные стороны, дай 2-3 совета. Отвечай по-русски, 150-200 слов.` }]
        })
      });
      const data = await res.json();
      setResult(data.content?.[0]?.text || '');
    } catch { setResult('Не удалось получить анализ.'); }
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 520, overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #F472B6, #A78BFA)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Heart size={22} color="#fff" />
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>Психологическая поддержка</span>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, padding: '4px 8px', cursor: 'pointer', color: '#fff' }}><X size={18} /></button>
        </div>
        <div style={{ padding: 28 }}>
          {result ? (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 40 }}>🌟</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#1a1a2e', marginBottom: 8 }}>Твой психологический портрет</div>
              </div>
              <div style={{ background: '#FDF4FF', borderRadius: 12, padding: 18, lineHeight: 1.7, color: '#444', fontSize: 14 }}>{result}</div>
              <button onClick={() => { onComplete(); onClose(); }} style={{ marginTop: 16, width: '100%', background: 'linear-gradient(135deg, #F472B6, #A78BFA)', border: 'none', borderRadius: 12, padding: 12, color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 15 }}>Готово ✓</button>
            </div>
          ) : loading ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
              <div style={{ width: 32, height: 32, border: '3px solid #F472B6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
              AI анализирует твои ответы...
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: 8, color: '#888', fontSize: 13 }}>Вопрос {step + 1} из {questions.length}</div>
              <div style={{ background: '#f5f5f5', borderRadius: 8, height: 4, marginBottom: 20 }}>
                <div style={{ background: 'linear-gradient(90deg, #F472B6, #A78BFA)', height: '100%', borderRadius: 8, width: `${(step / questions.length) * 100}%`, transition: 'width 0.3s' }} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 17, color: '#1a1a2e', marginBottom: 20 }}>{questions[step].q}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {questions[step].options.map((opt, i) => (
                  <button key={i} onClick={() => selectAnswer(i)} style={{ background: '#F8F7FF', border: '1.5px solid #e0e0e0', borderRadius: 12, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontSize: 14, color: '#333' }}>{opt}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

// ─── DOC HUB CATEGORIES (needs useState, so extracted) ────────────────────────
const DocHubCategories: React.FC<{
  myDocuments: UserDocument[];
  getDocTypeName: (t: string) => string;
  getDocStatusBadge: (s: string) => React.ReactNode;
  handleDeleteDocument: (id: string) => void;
  setShowUploadModal: (v: boolean) => void;
  ACCENT: string;
}> = ({ myDocuments, getDocTypeName, getDocStatusBadge, handleDeleteDocument, setShowUploadModal, ACCENT }) => {
  const allCats = [
    { id: 'all', label: 'Все', types: [] as string[] },
    { id: 'passport', label: '🪪 Паспорт', types: ['passport', 'id_card', 'birth_certificate'] },
    { id: 'education', label: '🎓 Диплом/Аттестат', types: ['diploma', 'transcript', 'attestat'] },
    { id: 'transcript', label: '📄 Транскрипт', types: ['transcript'] },
    { id: 'cv', label: '📋 CV/Резюме', types: ['cv'] },
    { id: 'motivation', label: '✉️ Мотивационное письмо', types: ['motivation_letter'] },
    { id: 'recommendation', label: '👤 Рекомендательное письмо', types: ['recommendation'] },
    { id: 'language', label: '🌐 Языковой сертификат', types: ['language_certificate', 'ielts', 'toefl'] },
    { id: 'financial', label: '💰 Финансовые документы', types: ['financial'] },
  ];
  const [activeCat, setActiveCat] = useState('all');
  const filteredDocs = activeCat === 'all' ? myDocuments : myDocuments.filter(d => (allCats.find(c => c.id === activeCat)?.types || []).includes(d.document_type));

  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {allCats.map(cat => {
          const count = cat.id === 'all' ? myDocuments.length : myDocuments.filter(d => cat.types.includes(d.document_type)).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              style={{ background: activeCat === cat.id ? ACCENT : '#F5F5F8', border: 'none', borderRadius: 20, padding: '6px 14px', color: activeCat === cat.id ? '#fff' : '#555', fontWeight: activeCat === cat.id ? 600 : 400, cursor: 'pointer', fontSize: 12 }}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {filteredDocs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#bbb' }}>
          <FileText size={40} color="#ddd" style={{ margin: '0 auto 12px', display: 'block' }} />
          <div style={{ marginBottom: 16, fontSize: 14 }}>Нет документов в этой категории</div>
          <button
            onClick={() => setShowUploadModal(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: ACCENT, border: 'none', borderRadius: 10, padding: '9px 18px', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}
          >
            <Upload size={14} /> Загрузить
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredDocs.map(doc => (
            <div key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#F9FAFB', borderRadius: 12, padding: '12px 16px', border: '1px solid #F0F0F0' }}>
              <div style={{ width: 38, height: 38, background: '#EFF6FF', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#3B82F6', flexShrink: 0 }}>
                {doc.original_name.split('.').pop()?.toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: '#1a1a2e', fontSize: 14 }}>{getDocTypeName(doc.document_type)}</div>
                <div style={{ color: '#999', fontSize: 12, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.original_name} • {(doc.file_size / 1024).toFixed(0)} KB</div>
              </div>
              {getDocStatusBadge(doc.status)}
              <button onClick={() => handleDeleteDocument(doc.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', padding: 4, flexShrink: 0 }}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Sidebar active section state (replaces tab-based navigation)
  const [activeSection, setActiveSection] = useState('applications');

  // Journey / AI modals
  const [showAIPlan, setShowAIPlan] = useState(false);
  const [showPsychTest, setShowPsychTest] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Applications
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
  const [consultationForm, setConsultationForm] = useState({ date: '', time: '', topic: '', message: '' });
  const [consultationSubmitting, setConsultationSubmitting] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);

  // Profile state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState<UserProfile>({ phone: '', country: '', date_of_birth: '' });
  const [profileSaving, setProfileSaving] = useState(false);

  // Documents state
  const [myDocuments, setMyDocuments] = useState<UserDocument[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'student') { navigate('/login'); return; }

    setNewAppForm(prev => ({ ...prev, full_name: user.name || '', email: user.email || '' }));

    const saved = localStorage.getItem(`soara_steps_${user.email}`);
    if (saved) setCompletedSteps(JSON.parse(saved));

    loadApplications();
    loadUpcomingEvents();
    loadMyConsultations();
    loadMyDocuments();
    loadUserProfile();
  }, [user, navigate]);

  const completeStep = (id: string) => {
    if (completedSteps.includes(id)) return;
    const updated = [...completedSteps, id];
    setCompletedSteps(updated);
    localStorage.setItem(`soara_steps_${user!.email}`, JSON.stringify(updated));
  };

  // ── Journey Steps ──────────────────────────────────────────────────────────
  const journeySteps: JourneyStep[] = [
    { id: 'profile', title: 'Заполни профиль', description: 'Личные данные, образование, цели', icon: <User size={20} />, status: completedSteps.includes('profile') ? 'completed' : 'active', action: 'Заполнить' },
    { id: 'documents', title: 'Загрузи документы', description: 'Паспорт, аттестат, сертификаты языка', icon: <FileText size={20} />, status: completedSteps.includes('profile') ? (completedSteps.includes('documents') ? 'completed' : 'active') : 'locked', action: 'Загрузить' },
    { id: 'ai_plan', title: 'AI Персональный план', description: 'AI составит маршрут под твои цели и страны', icon: <Brain size={20} />, status: completedSteps.includes('documents') ? (completedSteps.includes('ai_plan') ? 'completed' : 'active') : 'locked', action: 'Создать план' },
    { id: 'psych', title: 'Психологическая поддержка', description: 'Тест готовности и AI-рекомендации', icon: <Heart size={20} />, status: completedSteps.includes('ai_plan') ? (completedSteps.includes('psych') ? 'completed' : 'active') : 'locked', action: 'Пройти тест' },
    { id: 'apply', title: 'Подача заявок', description: 'Канбан-трекер твоих поступлений', icon: <Target size={20} />, status: completedSteps.includes('psych') ? (completedSteps.includes('apply') ? 'completed' : 'active') : 'locked', action: 'Подать заявку' },
    { id: 'enrolled', title: 'Зачислен в университет', description: 'Получил оффер и подтвердил поступление', icon: <Star size={20} />, status: completedSteps.includes('apply') ? (completedSteps.includes('enrolled') ? 'completed' : 'active') : 'locked', action: 'Отметить' },
    { id: 'studying', title: 'Учёба за рубежом', description: 'Успешно переехал и начал учиться', icon: <TrendingUp size={20} />, status: completedSteps.includes('enrolled') ? (completedSteps.includes('studying') ? 'completed' : 'active') : 'locked', action: 'Отметить' },
    { id: 'graduated', title: 'Окончил университет', description: 'Получил диплом и квалификацию', icon: <CheckCircle size={20} />, status: completedSteps.includes('studying') ? (completedSteps.includes('graduated') ? 'completed' : 'active') : 'locked', action: 'Отметить' },
    { id: 'job', title: 'Нашёл работу 🎉', description: 'Трудоустроен по специальности — путь завершён!', icon: <Bell size={20} />, status: completedSteps.includes('graduated') ? (completedSteps.includes('job') ? 'completed' : 'active') : 'locked', action: 'Поздравить себя!' },
  ];

  // 100% only when ALL steps including 'job' are completed
  const progress = completedSteps.includes('job')
    ? 100
    : Math.min(Math.round((completedSteps.length / journeySteps.length) * 100), 99);

  const handleStepAction = (step: JourneyStep) => {
    if (step.status === 'locked') return;
    if (step.id === 'ai_plan') { setShowAIPlan(true); return; }
    if (step.id === 'psych') { setShowPsychTest(true); return; }
    if (step.id === 'documents') { setActiveSection('documents'); completeStep('documents'); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    completeStep(step.id);
  };

  // ── API helpers ────────────────────────────────────────────────────────────
  const loadUserProfile = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch(`http://localhost:3000/api/users/${user?.id}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success && data.data) {
        setProfileForm({ phone: data.data.phone || '', country: data.data.country || '', date_of_birth: data.data.date_of_birth?.split('T')[0] || '' });
      }
    } catch (error) { console.error('Failed to load profile:', error); }
  };

  const loadMyDocuments = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/documents/my', {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success && data.data) setMyDocuments(data.data);
    } catch (error) { console.error('Failed to load documents:', error); }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch(`http://localhost:3000/api/users/${user?.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (data.success) { alert('Профиль успешно обновлен!'); setShowProfileModal(false); }
      else alert(data.message || 'Ошибка обновления профиля');
    } catch (error) { console.error('Failed to save profile:', error); alert('Ошибка сохранения профиля'); }
    finally { setProfileSaving(false); }
  };

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileInput = document.getElementById('document-file') as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (!file || !selectedDocType) { alert('Выберите файл и тип документа'); return; }
    setUploadingDoc(true);
    try {
      const token = localStorage.getItem('ketem_token');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('document_type', selectedDocType);
      const response = await fetch('http://localhost:3000/api/documents/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      if (data.success) { alert('Документ успешно загружен!'); setShowUploadModal(false); setSelectedDocType(''); loadMyDocuments(); }
      else alert(data.message || 'Ошибка загрузки документа');
    } catch (error) { console.error('Failed to upload document:', error); alert('Ошибка загрузки документа'); }
    finally { setUploadingDoc(false); }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот документ?')) return;
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch(`http://localhost:3000/api/documents/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) loadMyDocuments();
      else alert(data.message || 'Ошибка удаления документа');
    } catch (error) { console.error('Failed to delete document:', error); }
  };

  const getDocTypeName = (type: string) => {
    const types: Record<string, string> = { passport: 'Паспорт', diploma: 'Аттестат/Диплом', photo: 'Фотография', motivation_letter: 'Мотивационное письмо', recommendation: 'Рекомендательное письмо', language_certificate: 'Языковой сертификат', other: 'Другое' };
    return types[type] || type;
  };

  const getDocStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">На проверке</span>;
      case 'approved': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Одобрен</span>;
      case 'rejected': return <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Отклонен</span>;
      default: return null;
    }
  };

  const loadMyConsultations = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/consultations/my', {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success && data.data) setMyConsultations(data.data);
    } catch (error) { console.error('Failed to load consultations:', error); }
  };

  const loadUpcomingEvents = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/events?active_only=true', {
        headers: token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) { setUpcomingEvents(data.data.filter((event: any) => new Date(event.event_date) >= new Date())); return; }
      }
      const publicResponse = await fetch('http://localhost:3000/api/events/upcoming?limit=50');
      const publicData = await publicResponse.json();
      if (publicData.success && publicData.data) setUpcomingEvents(publicData.data);
    } catch (error) { console.error('Failed to load events:', error); }
  };

  const loadApplications = async () => {
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/applications/my', {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
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
    } catch (error) { console.error('Failed to load applications:', error); }
    finally { setLoading(false); }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/applications', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppForm)
      });
      const data = await response.json();
      if (data.success) {
        setShowNewAppModal(false);
        setNewAppForm({ full_name: user?.name || '', email: user?.email || '', phone: '', country_preference: '', university: '', program_type: '', education_level: '', message: '' });
        loadApplications();
      } else alert(data.message || 'Ошибка при отправке заявки');
    } catch (error) { console.error('Failed to submit application:', error); alert('Ошибка при отправке заявки'); }
    finally { setSubmitting(false); }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"><Clock className="w-4 h-4" /><span>В обработке</span></span>;
      case 'approved': return <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"><CheckCircle className="w-4 h-4" /><span>Одобрено</span></span>;
      case 'rejected': return <span className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"><span>✕</span><span>Отклонено</span></span>;
      default: return null;
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
      case 'pending': return <span className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"><Clock className="w-4 h-4" /><span>Ожидает</span></span>;
      case 'confirmed': return <span className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"><CheckCircle className="w-4 h-4" /><span>Подтверждено</span></span>;
      case 'completed': return <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"><CheckCircle className="w-4 h-4" /><span>Завершено</span></span>;
      case 'cancelled': return <span className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"><X className="w-4 h-4" /><span>Отменено</span></span>;
      default: return null;
    }
  };

  const getTopicLabel = (topic: string) => {
    const topics: Record<string, string> = { admission: 'Поступление в университет', documents: 'Подготовка документов', visa: 'Виза и легализация', programs: 'Выбор программы', other: 'Другое' };
    return topics[topic] || topic;
  };

  const handleBookConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationSubmitting(true);
    try {
      const token = localStorage.getItem('ketem_token');
      const response = await fetch('http://localhost:3000/api/consultations', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...consultationForm, user_name: user?.name, user_email: user?.email })
      });
      const data = await response.json();
      if (data.success) { alert('Консультация успешно забронирована!'); setShowConsultationModal(false); setConsultationForm({ date: '', time: '', topic: '', message: '' }); loadMyConsultations(); }
      else alert(data.message || 'Ошибка при бронировании');
    } catch (error) { console.error('Failed to book consultation:', error); alert('Ошибка при бронировании консультации'); }
    finally { setConsultationSubmitting(false); }
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

  // ── Sidebar nav items ──────────────────────────────────────────────────────
  const navItems = [
    { id: 'journey', label: 'Мой путь', icon: <Map size={18} /> },
    { id: 'applications', label: 'Мои заявки', icon: <FileText size={18} /> },
    { id: 'documents', label: 'Document Hub', icon: <FolderOpen size={18} /> },
    { id: 'ai', label: 'AI Инструменты', icon: <Sparkles size={18} /> },
    { id: 'stats', label: 'Статистика', icon: <BarChart2 size={18} /> },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F5F8', fontFamily: 'system-ui, sans-serif' }}>

      {/* ── SIDEBAR ─────────────────────────────────────────────────────────── */}
      <div style={{ width: 248, background: '#1a1a1a', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', flexShrink: 0 }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #2e2e2e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#fff', lineHeight: 1.2 }}>{user?.name}</div>
              <div style={{ fontSize: 11, color: '#666' }}>Студент</div>
            </div>
          </div>
          <div style={{ marginTop: 10, cursor: 'pointer' }} onClick={() => { setActiveSection('journey'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} title="Открыть мой путь">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 11, color: '#666' }}>
              <span>Прогресс</span><span style={{ color: ACCENT, fontWeight: 600 }}>{progress}%</span>
            </div>
            <div style={{ background: '#2e2e2e', borderRadius: 4, height: 5, position: 'relative' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: progress === 100 ? 'linear-gradient(90deg, #10B981, #059669)' : `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})`, borderRadius: 4, transition: 'width 0.5s' }} />
            </div>
            <div style={{ fontSize: 10, color: '#555', marginTop: 4 }}>
              {progress === 100 ? '🎉 Путь завершён!' : `${completedSteps.length} из ${journeySteps.length} шагов`}
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '10px 10px' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left', marginBottom: 2, background: activeSection === item.id ? 'rgba(255,107,53,0.15)' : 'transparent', color: activeSection === item.id ? ACCENT : '#aaa', borderLeft: activeSection === item.id ? `3px solid ${ACCENT}` : '3px solid transparent', fontWeight: activeSection === item.id ? 600 : 400, fontSize: 14 }}
            >
              {item.icon}{item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '12px 10px', borderTop: '1px solid #2e2e2e' }}>
          <button
            onClick={() => { logout(); navigate('/'); }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', color: '#999', background: 'transparent', fontSize: 14 }}
          >
            <LogOut size={16} />Выйти
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* ── JOURNEY ── */}
        {activeSection === 'journey' && (
          <div style={{ padding: '28px 32px' }}>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#1a1a2e' }}>Мой путь поступления</h1>
              <p style={{ margin: '6px 0 0', color: '#888', fontSize: 15 }}>Каждый этап открывается после завершения предыдущего</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {journeySteps.map((step, idx) => {
                const isLocked = step.status === 'locked';
                const isDone = step.status === 'completed';
                return (
                  <div key={step.id} style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', border: isDone ? '1.5px solid #10B981' : isLocked ? '1.5px solid #F0F0F0' : `1.5px solid ${ACCENT}40`, opacity: isLocked ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: 18 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: isDone ? '#D1FAE5' : isLocked ? '#F5F5F5' : `${ACCENT}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDone ? '#10B981' : isLocked ? '#CCC' : ACCENT, flexShrink: 0 }}>
                      {isDone ? <Check size={22} /> : isLocked ? <Lock size={20} /> : step.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                        <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a2e' }}>{step.title}</span>
                        <span style={{ fontSize: 12, color: '#999' }}>Шаг {idx + 1}</span>
                        {isDone && <span style={{ background: '#D1FAE5', color: '#10B981', borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>Выполнено ✓</span>}
                      </div>
                      <p style={{ margin: 0, color: '#888', fontSize: 14 }}>{step.description}</p>
                    </div>
                    {!isDone && !isLocked && (
                      <button onClick={() => handleStepAction(step)} style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, border: 'none', borderRadius: 12, padding: '10px 20px', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 14, whiteSpace: 'nowrap' }}>
                        {step.action} →
                      </button>
                    )}
                    {isLocked && <div style={{ color: '#CCC', fontSize: 13 }}>Заблокировано</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── APPLICATIONS (main dashboard) ── */}
        {activeSection === 'applications' && (
          <div className="py-8 px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
              <p className="text-gray-600 mt-2">Добро пожаловать, {user?.name}!</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm text-gray-600">Мои заявки</p><p className="text-3xl font-bold text-gray-900">{stats.total}</p></div>
                  <FileText className="w-12 h-12 text-orange-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm text-gray-600">В обработке</p><p className="text-3xl font-bold text-yellow-600">{stats.pending}</p></div>
                  <Clock className="w-12 h-12 text-yellow-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm text-gray-600">Одобрено</p><p className="text-3xl font-bold text-green-600">{stats.approved}</p></div>
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm text-gray-600">Отклонено</p><p className="text-3xl font-bold text-red-600">{stats.rejected}</p></div>
                  <X className="w-12 h-12 text-red-500" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Быстрые действия</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button onClick={() => setShowConsultationModal(true)} className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group">
                  <Phone className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mb-2" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center">Записаться на консультацию</span>
                </button>
                <button onClick={() => setShowCuratorModal(true)} className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group">
                  <MessageCircle className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mb-2" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center">Связаться с куратором</span>
                </button>
                <button onClick={() => setShowDocumentsModal(true)} className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group">
                  <ClipboardCheck className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mb-2" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center">Проверить документы</span>
                </button>
                <button onClick={() => setShowMaterialsModal(true)} className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group">
                  <Download className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mb-2" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center">Скачать материалы</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main */}
              <div className="lg:col-span-2 space-y-6">
                {/* Applications */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Мои заявки</h2>
                    <button onClick={() => setShowNewAppModal(true)} className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm">
                      <Plus className="w-4 h-4" /><span>Подать заявку</span>
                    </button>
                  </div>
                  {loading ? (
                    <div className="text-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div><p className="text-gray-600 mt-2">Загрузка...</p></div>
                  ) : myApplications.length > 0 ? (
                    <div className="space-y-4">
                      {myApplications.map(app => (
                        <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div><h3 className="font-semibold text-lg">{app.university}</h3><p className="text-sm text-gray-600">{app.country}</p></div>
                            {getStatusBadge(app.status)}
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{app.program}</p>
                          <p className="text-xs text-gray-500">Подано: {new Date(app.date).toLocaleDateString('ru-RU')}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12"><FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" /><p className="text-gray-600">У вас пока нет заявок на обучение</p></div>
                  )}
                </div>

                {/* Consultations */}
                {myConsultations.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Мои консультации</h2>
                      <button onClick={() => setShowConsultationModal(true)} className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm">
                        <Plus className="w-4 h-4" /><span>Записаться</span>
                      </button>
                    </div>
                    <div className="space-y-4">
                      {myConsultations.map(consultation => (
                        <div key={consultation.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{getTopicLabel(consultation.topic)}</h3>
                              <p className="text-sm text-gray-600">{new Date(consultation.consultation_date).toLocaleDateString('ru-RU')} в {consultation.consultation_time}</p>
                            </div>
                            {getConsultationStatusBadge(consultation.status)}
                          </div>
                          {consultation.message && <p className="text-sm text-gray-700 mb-2">{consultation.message}</p>}
                          <p className="text-xs text-gray-500">Подано: {new Date(consultation.created_at).toLocaleDateString('ru-RU')}</p>
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
                    <h3 className="font-semibold flex items-center space-x-2"><User className="w-5 h-5 text-orange-500" /><span>Мой профиль</span></h3>
                    <button onClick={() => setShowProfileModal(true)} className="p-1 text-orange-500 hover:bg-orange-50 rounded" title="Редактировать"><Edit className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div><span className="text-gray-500">Имя:</span><p className="font-medium">{user?.name}</p></div>
                    <div><span className="text-gray-500">Email:</span><p className="font-medium">{user?.email}</p></div>
                    <div><span className="text-gray-500">Телефон:</span><p className="font-medium">{profileForm.phone || <span className="text-gray-400 italic">Не указан</span>}</p></div>
                    <div><span className="text-gray-500">Страна:</span><p className="font-medium">{profileForm.country || <span className="text-gray-400 italic">Не указана</span>}</p></div>
                    <div><span className="text-gray-500">Дата рождения:</span><p className="font-medium">{profileForm.date_of_birth ? new Date(profileForm.date_of_birth).toLocaleDateString('ru-RU') : <span className="text-gray-400 italic">Не указана</span>}</p></div>
                  </div>
                </div>

                {/* My Documents */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold flex items-center space-x-2"><FileText className="w-5 h-5 text-orange-500" /><span>Мои документы</span></h3>
                    <button onClick={() => setShowUploadModal(true)} className="p-1 text-orange-500 hover:bg-orange-50 rounded" title="Загрузить документ"><Upload className="w-4 h-4" /></button>
                  </div>
                  {myDocuments.length > 0 ? (
                    <div className="space-y-2">
                      {myDocuments.map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                          <div className="flex-1 min-w-0"><p className="font-medium truncate">{getDocTypeName(doc.document_type)}</p><p className="text-xs text-gray-500 truncate">{doc.original_name}</p></div>
                          <div className="flex items-center space-x-2 ml-2">{getDocStatusBadge(doc.status)}<button onClick={() => handleDeleteDocument(doc.id)} className="p-1 text-red-500 hover:bg-red-50 rounded" title="Удалить"><Trash2 className="w-3 h-3" /></button></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4"><FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" /><p className="text-sm text-gray-500">Нет загруженных документов</p><button onClick={() => setShowUploadModal(true)} className="text-sm text-orange-500 hover:text-orange-600 mt-2">Загрузить документ</button></div>
                  )}
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold mb-4 flex items-center space-x-2"><Calendar className="w-5 h-5 text-orange-500" /><span>Предстоящие события</span></h3>
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-3">
                      {(showAllEvents ? upcomingEvents : upcomingEvents.slice(0, 5)).map(event => (
                        <div key={event.id} className="text-sm border-l-2 border-orange-500 pl-3 py-1">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-gray-500 text-xs">{new Date(event.event_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">{event.event_type === 'webinar' ? 'Вебинар' : event.event_type === 'open_day' ? 'День открытых дверей' : event.event_type === 'consultation' ? 'Консультация' : 'Событие'}</span>
                        </div>
                      ))}
                      {upcomingEvents.length > 5 && (
                        <button onClick={() => setShowAllEvents(!showAllEvents)} className="text-sm text-orange-500 hover:text-orange-600 font-medium mt-2">
                          {showAllEvents ? 'Скрыть' : `Показать все (${upcomingEvents.length})`}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4"><Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" /><p className="text-sm text-gray-500">Нет предстоящих событий</p></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── DOCUMENT HUB ── */}
        {activeSection === 'documents' && (
          <div style={{ padding: '28px 32px' }}>
            {/* Header */}
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#1a1a2e' }}>Document Hub</h1>
                <p style={{ margin: '4px 0 0', color: '#888' }}>Все документы для поступления в одном месте</p>
              </div>
              <div style={{ background: '#F5F5F8', border: '1px solid #E5E7EB', borderRadius: 20, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#888' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: myDocuments.length > 0 && myDocuments.filter(d => d.status === 'approved').length === myDocuments.length ? '#10B981' : '#E5E7EB' }} />
                {myDocuments.length > 0 ? Math.round((myDocuments.filter(d => d.status === 'approved').length / myDocuments.length) * 100) : 0}% готовность
              </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
              {[
                { label: 'Документов', value: myDocuments.length, color: '#1a1a2e' },
                { label: 'Проверено', value: myDocuments.filter(d => d.status === 'approved').length, color: '#10B981' },
                { label: 'Ожидает', value: myDocuments.filter(d => d.status === 'pending').length, color: '#F59E0B' },
                { label: 'Хранилище', value: myDocuments.length > 0 ? Math.round(myDocuments.reduce((acc, d) => acc + (d.file_size || 0), 0) / 1024 / 10.24) / 100 + '%' : '0%', color: '#8B5CF6' },
              ].map((stat, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '20px 22px', border: '1px solid #F0F0F0' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: stat.color, marginBottom: 4 }}>{stat.value}</div>
                  <div style={{ color: '#999', fontSize: 13 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Key Docs */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #F0F0F0', padding: '18px 22px', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <CheckCircle size={16} color="#10B981" />
                <span style={{ fontWeight: 700, color: '#1a1a2e', fontSize: 15 }}>Ключевые документы</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {[
                  { label: 'CV / Резюме', type: 'cv' },
                  { label: 'Мотивационное', type: 'motivation_letter' },
                  { label: 'Рекомендация', type: 'recommendation' },
                  { label: 'Транскрипт', type: 'transcript' },
                ].map((key) => {
                  const doc = myDocuments.find(d => d.document_type === key.type);
                  return (
                    <div key={key.type} style={{ border: '1.5px solid #F0F0F0', borderRadius: 12, padding: '12px 14px' }}>
                      <div style={{ fontSize: 11, color: doc ? (doc.status === 'approved' ? '#10B981' : doc.status === 'rejected' ? '#EF4444' : '#F59E0B') : '#999', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <FileText size={11} />
                        {doc ? (doc.status === 'approved' ? 'Проверен' : doc.status === 'rejected' ? 'Отклонён' : 'На проверке') : 'Не загружен'}
                      </div>
                      <div style={{ fontWeight: 600, color: '#1a1a2e', fontSize: 13 }}>{key.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main layout */}
            <div style={{ display: 'flex', gap: 20 }}>
              {/* Left - Categories + Files */}
              <div style={{ flex: 1 }}>
                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #F0F0F0', padding: '18px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span style={{ fontWeight: 700, color: '#1a1a2e', fontSize: 15 }}>Категории</span>
                    <button
                      onClick={() => setShowUploadModal(true)}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, background: ACCENT, border: 'none', borderRadius: 10, padding: '9px 16px', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}
                    >
                      <Upload size={14} /> Загрузить
                    </button>
                  </div>
                  <DocHubCategories
                    myDocuments={myDocuments}
                    getDocTypeName={getDocTypeName}
                    getDocStatusBadge={getDocStatusBadge}
                    handleDeleteDocument={handleDeleteDocument}
                    setShowUploadModal={setShowUploadModal}
                    ACCENT={ACCENT}
                  />
                </div>
              </div>

              {/* Right - Admin verification status */}
              <div style={{ width: 260, flexShrink: 0 }}>
                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #F0F0F0', padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <Shield size={16} color={ACCENT} />
                    <span style={{ fontWeight: 700, color: '#1a1a2e', fontSize: 15 }}>Проверка документов</span>
                  </div>
                  <p style={{ color: '#888', fontSize: 12, marginBottom: 14, lineHeight: 1.5 }}>Администратор проверяет ваши документы и подтверждает их корректность</p>

                  {myDocuments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px 10px', color: '#ccc', fontSize: 13 }}>Загрузите документы для проверки</div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {myDocuments.slice(0, 6).map(doc => (
                        <div key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: '#F9FAFB', borderRadius: 10 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: doc.status === 'approved' ? '#10B981' : doc.status === 'rejected' ? '#EF4444' : '#F59E0B', flexShrink: 0 }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{getDocTypeName(doc.document_type)}</div>
                            <div style={{ fontSize: 11, color: '#999' }}>{doc.status === 'approved' ? 'Подтверждён ✓' : doc.status === 'rejected' ? 'Отклонён ✗' : 'На проверке...'}</div>
                          </div>
                        </div>
                      ))}
                      {myDocuments.length > 6 && (
                        <div style={{ textAlign: 'center', fontSize: 12, color: '#999', paddingTop: 4 }}>+{myDocuments.length - 6} ещё</div>
                      )}
                    </div>
                  )}

                  <div style={{ marginTop: 16, padding: '10px 12px', background: '#FFF8F5', borderRadius: 10, fontSize: 12, color: ACCENT, lineHeight: 1.5 }}>
                    💡 Статус проверки обновляется администратором. Вы увидите результат здесь.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

                {/* ── AI TOOLS ── */}
        {activeSection === 'ai' && (
          <div style={{ padding: '28px 32px' }}>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#1a1a2e' }}>AI Инструменты</h1>
              <p style={{ margin: '4px 0 0', color: '#888' }}>Умные помощники для твоего поступления</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                { title: 'Персональный план', desc: 'AI составит пошаговый маршрут поступления на основе твоих данных и целевых стран', icon: <Brain size={28} color="#fff" />, gradient: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, action: () => setShowAIPlan(true), btn: 'Создать план' },
                { title: 'Психологическая поддержка', desc: 'Тест готовности к переезду и персональные рекомендации от AI-психолога', icon: <Heart size={28} color="#fff" />, gradient: 'linear-gradient(135deg, #F472B6, #A78BFA)', action: () => setShowPsychTest(true), btn: 'Пройти тест' },
              ].map((tool, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', border: '1px solid #F0F0F0' }}>
                  <div style={{ background: tool.gradient, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{tool.icon}</div>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}>{tool.title}</span>
                  </div>
                  <div style={{ padding: 20 }}>
                    <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>{tool.desc}</p>
                    <button onClick={tool.action} style={{ background: tool.gradient, border: 'none', borderRadius: 10, padding: '10px 18px', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>{tool.btn}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STATS ── */}
        {activeSection === 'stats' && (
          <div style={{ padding: '28px 32px' }}>
            <h1 style={{ margin: '0 0 24px', fontSize: 26, fontWeight: 800, color: '#1a1a2e' }}>Статистика</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'Этапов выполнено', value: completedSteps.length, icon: <Check size={22} />, color: '#10B981', bg: '#D1FAE5' },
                { label: 'Прогресс', value: `${progress}%`, icon: <TrendingUp size={22} />, color: ACCENT, bg: '#FFF0EB' },
                { label: 'Заявок', value: myApplications.length, icon: <FileText size={22} />, color: '#F59E0B', bg: '#FEF3C7' },
                { label: 'Дней в системе', value: 1, icon: <BarChart2 size={22} />, color: '#3B82F6', bg: '#EFF6FF' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{s.icon}</div>
                  <div style={{ fontSize: 30, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ color: '#888', fontSize: 13 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 20px', color: '#1a1a2e', fontSize: 16, fontWeight: 700 }}>Статус этапов</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {journeySteps.map((step, idx) => {
                  const isLocked = step.status === 'locked';
                  const isDone = step.status === 'completed';
                  return (
                    <div key={step.id} style={{ background: isDone ? '#F0FDF4' : isLocked ? '#FAFAFA' : '#FFF8F5', borderRadius: 16, padding: '18px 22px', border: isDone ? '1.5px solid #10B981' : isLocked ? '1.5px solid #F0F0F0' : `1.5px solid ${ACCENT}40`, opacity: isLocked ? 0.65 : 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: isDone ? '#D1FAE5' : isLocked ? '#F0F0F0' : `${ACCENT}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDone ? '#10B981' : isLocked ? '#CCC' : ACCENT, flexShrink: 0 }}>
                        {isDone ? <Check size={22} /> : isLocked ? <Lock size={20} /> : step.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                          <span style={{ fontWeight: 700, fontSize: 15, color: isLocked ? '#BBB' : '#1a1a2e' }}>{step.title}</span>
                          <span style={{ fontSize: 11, color: '#bbb' }}>Шаг {idx + 1}</span>
                        </div>
                        <p style={{ margin: 0, color: '#999', fontSize: 13 }}>{step.description}</p>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 20, background: isDone ? '#D1FAE5' : isLocked ? '#F5F5F5' : '#FFF0EB', color: isDone ? '#10B981' : isLocked ? '#CCC' : ACCENT, whiteSpace: 'nowrap' }}>
                        {isDone ? '✓ Выполнено' : isLocked ? 'Заблокировано' : 'В процессе'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── MODALS ──────────────────────────────────────────────────────────── */}

      {/* New Application Modal */}
      {showNewAppModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Новая заявка на обучение</h3>
                <button onClick={() => setShowNewAppModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">ФИО</label><input type="text" value={newAppForm.full_name} onChange={(e) => setNewAppForm({ ...newAppForm, full_name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={newAppForm.email} onChange={(e) => setNewAppForm({ ...newAppForm, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label><input type="tel" value={newAppForm.phone} onChange={(e) => setNewAppForm({ ...newAppForm, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" /></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Страна обучения</label>
                  <select value={newAppForm.country_preference} onChange={(e) => setNewAppForm({ ...newAppForm, country_preference: e.target.value, university: '' })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
                    <option value="">Выберите страну</option>
                    <option value="Италия">Италия</option>
                    <option value="Чехия">Чехия</option>
                    <option value="Словакия">Словакия</option>
                    <option value="Германия">Германия</option>
                    <option value="Польша">Польша</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Университет</label><input type="text" value={newAppForm.university} onChange={(e) => setNewAppForm({ ...newAppForm, university: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Название университета (необязательно)" /></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Направление</label>
                  <select value={newAppForm.program_type} onChange={(e) => setNewAppForm({ ...newAppForm, program_type: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Уровень образования</label>
                  <select value={newAppForm.education_level} onChange={(e) => setNewAppForm({ ...newAppForm, education_level: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
                    <option value="">Выберите уровень</option>
                    <option value="Бакалавриат">Бакалавриат</option>
                    <option value="Магистратура">Магистратура</option>
                    <option value="Докторантура">Докторантура</option>
                    <option value="Языковые курсы">Языковые курсы</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Дополнительная информация</label><textarea value={newAppForm.message} onChange={(e) => setNewAppForm({ ...newAppForm, message: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Расскажите о себе и своих целях..." /></div>
                <div className="flex space-x-3 pt-4">
                  <button type="button" onClick={() => setShowNewAppModal(false)} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">Отмена</button>
                  <button type="submit" disabled={submitting} className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50">{submitting ? 'Отправка...' : 'Отправить'}</button>
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
                <button onClick={() => setShowConsultationModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleBookConsultation} className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Предпочтительная дата</label><input type="date" value={consultationForm.date} onChange={(e) => setConsultationForm({ ...consultationForm, date: e.target.value })} min={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required /></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Предпочтительное время</label>
                  <select value={consultationForm.time} onChange={(e) => setConsultationForm({ ...consultationForm, time: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
                    <option value="">Выберите время</option>
                    {['10:00','11:00','12:00','14:00','15:00','16:00','17:00'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Тема консультации</label>
                  <select value={consultationForm.topic} onChange={(e) => setConsultationForm({ ...consultationForm, topic: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
                    <option value="">Выберите тему</option>
                    <option value="admission">Поступление в университет</option>
                    <option value="documents">Подготовка документов</option>
                    <option value="visa">Виза и легализация</option>
                    <option value="programs">Выбор программы</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Дополнительные вопросы</label><textarea value={consultationForm.message} onChange={(e) => setConsultationForm({ ...consultationForm, message: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Опишите ваши вопросы..." /></div>
                <div className="flex space-x-3 pt-4">
                  <button type="button" onClick={() => setShowConsultationModal(false)} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">Отмена</button>
                  <button type="submit" disabled={consultationSubmitting} className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50">{consultationSubmitting ? 'Отправка...' : 'Записаться'}</button>
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
                <button onClick={() => setShowCuratorModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center"><MessageCircle className="w-6 h-6 text-white" /></div>
                    <div><h4 className="font-semibold">Ваш персональный куратор</h4><p className="text-sm text-gray-600">Готов помочь с любыми вопросами</p></div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { href: 'https://t.me/ketem_support', bg: 'bg-blue-500', label: 'T', title: 'Telegram', sub: '@ketem_support' },
                    { href: 'https://wa.me/79001234567', bg: 'bg-green-500', label: 'W', title: 'WhatsApp', sub: '+7 900 123-45-67' },
                    { href: 'mailto:curator@ketem.edu', bg: 'bg-red-500', label: '@', title: 'Email', sub: 'curator@ketem.edu' },
                    { href: 'tel:+79001234567', bg: 'bg-orange-500', label: '📞', title: 'Позвонить', sub: '+7 900 123-45-67' },
                  ].map((c, i) => (
                    <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${c.bg} rounded-full flex items-center justify-center`}><span className="text-white font-bold">{c.label}</span></div>
                        <div><p className="font-medium">{c.title}</p><p className="text-sm text-gray-500">{c.sub}</p></div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400" />
                    </a>
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center mt-4">Время работы: Пн-Пт 9:00-18:00 (МСК)</p>
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
                <button onClick={() => setShowDocumentsModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
              </div>
              <div className="mb-4 p-4 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800">Отметьте документы, которые у вас уже готовы. Это поможет вашему куратору понять, что нужно подготовить.</p></div>
              <div className="space-y-3">
                {documentChecklist.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 transition-all">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id={`doc-${index}`} className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                      <div><label htmlFor={`doc-${index}`} className="font-medium cursor-pointer">{doc.name}</label><p className="text-sm text-gray-500">{doc.description}</p></div>
                    </div>
                    <ClipboardCheck className="w-5 h-5 text-gray-300" />
                  </div>
                ))}
              </div>
              <div className="flex space-x-3 pt-6">
                <button onClick={() => setShowDocumentsModal(false)} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">Закрыть</button>
                <button onClick={() => { alert('Статус документов сохранен!'); setShowDocumentsModal(false); }} className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">Сохранить</button>
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
                <button onClick={() => setShowMaterialsModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
              </div>
              <div className="mb-4 p-4 bg-green-50 rounded-lg"><p className="text-sm text-green-800">Полезные материалы для подготовки к поступлению.</p></div>
              <div className="space-y-3">
                {materials.map((material, index) => (
                  <a key={index} href={material.url} download className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"><FileText className="w-5 h-5 text-orange-500" /></div>
                      <div><p className="font-medium">{material.name}</p><p className="text-sm text-gray-500">{material.type} • {material.size}</p></div>
                    </div>
                    <Download className="w-5 h-5 text-orange-500" />
                  </a>
                ))}
              </div>
              <button onClick={() => setShowMaterialsModal(false)} className="w-full mt-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">Закрыть</button>
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
                <button onClick={() => setShowProfileModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label><input type="tel" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="+7 (999) 123-45-67" /></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Страна</label>
                  <select value={profileForm.country} onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="">Выберите страну</option>
                    {['Россия','Казахстан','Узбекистан','Беларусь','Украина','Кыргызстан','Таджикистан','Туркменистан','Азербайджан','Армения','Грузия','Молдова','Другая'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Дата рождения</label><input type="date" value={profileForm.date_of_birth} onChange={(e) => setProfileForm({ ...profileForm, date_of_birth: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" /></div>
                <div className="flex space-x-3 pt-4">
                  <button type="button" onClick={() => setShowProfileModal(false)} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">Отмена</button>
                  <button type="submit" disabled={profileSaving} className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"><Save className="w-4 h-4" /><span>{profileSaving ? 'Сохранение...' : 'Сохранить'}</span></button>
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
                <button onClick={() => setShowUploadModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleUploadDocument} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Тип документа</label>
                  <select value={selectedDocType} onChange={(e) => setSelectedDocType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Файл</label>
                  <input type="file" id="document-file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required />
                  <p className="text-xs text-gray-500 mt-1">Разрешенные форматы: PDF, JPG, PNG, DOC, DOCX. Макс. размер: 10 МБ</p>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button type="button" onClick={() => setShowUploadModal(false)} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">Отмена</button>
                  <button type="submit" disabled={uploadingDoc} className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"><Upload className="w-4 h-4" /><span>{uploadingDoc ? 'Загрузка...' : 'Загрузить'}</span></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* AI Modals */}
      {showAIPlan && user && <AIPlanModal userName={user.name} onClose={() => { setShowAIPlan(false); if (!completedSteps.includes('ai_plan')) completeStep('ai_plan'); }} />}
      {showPsychTest && <PsychTestModal onClose={() => setShowPsychTest(false)} onComplete={() => { if (!completedSteps.includes('psych')) completeStep('psych'); }} />}

      {/* Chat Widgets */}
      {user && (
        <LiveChat currentUserId={user.email} currentUserName={user.name} currentUserRole="student" />
      )}
      {user && (
        <PrivateChat currentUserId={user.id} currentUserName={user.name} currentUserRole="student" />
      )}
    </div>
  );
};
