import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  PlusCircle, 
  FileText, 
  CheckCircle2, 
  Send, 
  Settings, 
  ChevronRight, 
  Search,
  MessageSquare,
  Paperclip,
  ArrowRight,
  Sparkles,
  Users,
  ShieldCheck,
  CreditCard,
  FileDown,
  Edit3
} from 'lucide-react';
import { WorkOrder } from './types';

// Mock Data
const MOCK_WORK_ORDERS: WorkOrder[] = [
  {
    id: 'WO001',
    customerName: '李先生',
    customerContact: '138****0001',
    status: 'DIRECTIONAL_SCHEMES',
    demandSources: [{ type: 'WECHAT', content: '暑期想带孩子去厦门，5天左右，预算2万...' }],
    directionalSchemes: [],
    serviceFeeStatus: 'PENDING',
    depositStatus: 'PENDING',
    createdAt: '2024-05-20 10:00'
  },
  {
    id: 'WO002',
    customerName: '张女士',
    customerContact: '139****0002',
    status: '9_9_PAYMENT',
    demandSources: [{ type: 'TEXT', content: '北京出发，欧洲12日深度游' }],
    directionalSchemes: [],
    serviceFeeStatus: 'SUCCESS',
    depositStatus: 'PENDING',
    createdAt: '2024-05-19 14:20'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'HOME' | 'CREATE' | 'ANALYSIS' | 'SCHEMES' | '9_9_PAY' | 'DEEP_CUSTOM' | 'DEPOSIT' | 'PDF'>('HOME');
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);
  const [orders, setOrders] = useState<WorkOrder[]>(MOCK_WORK_ORDERS);

  // Transitions
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const renderHome = () => (
    <div className="pb-20">
      <header className="px-6 pt-10 pb-4 flex justify-between items-center bg-white sticky top-0 z-10 border-b border-stone-100">
        <div>
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">北京加盟门店 · 0210</p>
          <h1 className="text-3xl font-serif italic text-brand-ink leading-tight">工作台</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-brand-ink border border-stone-200">
          <Users className="w-5 h-5" />
        </div>
      </header>

      <div className="px-6 mt-6">
        <div className="bg-stone-50 rounded-2xl p-4 flex items-center gap-3 border border-stone-200 mb-8">
          <Search className="w-5 h-5 text-stone-400" />
          <input type="text" placeholder="搜索订单或客户" className="bg-transparent border-none outline-none text-sm w-full placeholder:text-stone-300" />
        </div>

        <section>
          <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-2">
            <h2 className="font-serif text-lg italic uppercase tracking-wider text-brand-ink">待办工单 <span className="text-[12px] font-sans italic lowercase opacity-50">({orders.length} items)</span></h2>
            <button className="text-[10px] bg-stone-100 px-2 py-1 rounded font-bold uppercase tracking-widest">View All</button>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div 
                key={order.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedOrder(order);
                  setCurrentPage('SCHEMES');
                }}
                className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm active:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-brand-green text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                      {order.status.replace(/_/g, ' ')}
                    </div>
                    <span className="text-[10px] text-stone-400 font-medium uppercase tracking-tighter">{order.createdAt}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-brand-ink transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-brand-ink mb-1">{order.customerName} 的定制需求</h3>
                <div className="flex items-center gap-4 text-[11px] text-stone-500 font-medium italic">
                  <div className="flex items-center gap-1.5 uppercase tracking-wide not-italic font-bold text-[10px]">
                    <Users className="w-3 h-3" /> 小包团
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-3 h-3" /> Source: {order.demandSources[0].type}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-12 mb-10">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6">种子目的地样品词条</h2>
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {['北京', '厦门', '西藏', '新疆', '欧洲'].map(city => (
              <div key={city} className="flex-shrink-0 px-8 py-4 rounded-2xl bg-white border border-stone-200 text-sm font-bold shadow-sm hover:border-brand-ink transition-all">
                {city}
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-stone-100 flex items-center justify-around px-4 pb-safe z-20">
        <button onClick={() => setCurrentPage('HOME')} className="flex flex-col items-center gap-1.5 text-brand-green">
          <div className="w-1.5 h-1.5 bg-brand-green rounded-full mb-1"></div>
          <span className="text-[10px] font-black uppercase tracking-widest">工单</span>
        </button>
        <button 
          onClick={() => setCurrentPage('CREATE')}
          className="flex flex-col items-center gap-1 -mt-10"
        >
          <div className="w-14 h-14 bg-brand-ink rounded-2xl flex items-center justify-center shadow-xl text-white rotate-45 group transition-transform active:scale-90">
            <PlusCircle className="w-7 h-7 -rotate-45" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest mt-3 text-brand-ink">NEW</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-stone-400">
          <div className="w-1.5 h-1.5 bg-transparent rounded-full mb-1"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest">产品库</span>
        </button>
      </footer>
    </div>
  );

  const renderCreateRequest = () => (
    <div className="min-h-screen bg-brand-bg pb-20">
      <header className="px-6 py-6 bg-white flex items-center gap-4 border-b border-stone-100 sticky top-0 z-10">
        <button onClick={() => setCurrentPage('HOME')} className="p-2 -ml-2 text-brand-ink">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <h1 className="text-xl font-serif italic text-brand-ink">新建需求</h1>
      </header>

      <div className="px-6 mt-8 space-y-8">
        <div className="bg-white rounded-[32px] p-8 border border-stone-200 shadow-sm">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">
            客户称呼 / 项目名称
          </label>
          <input type="text" placeholder="如：北京暑期亲子研学游" className="w-full text-xl font-bold border-b border-stone-100 py-4 focus:border-brand-ink transition-colors outline-none pb-4 placeholder:text-stone-200" />
          
          <div className="mt-10">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4 block">
              种子目的地 (SELECTED)
            </label>
            <div className="flex flex-wrap gap-3">
              {['北京', '厦门', '欧洲', '新疆'].map(tag => (
                <button key={tag} className="px-5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-[12px] font-bold uppercase tracking-wider hover:bg-brand-ink hover:text-white transition-all">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-8 border border-stone-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 block">
              旅行需求描述
            </label>
            <button className="text-[10px] text-brand-green font-bold uppercase tracking-widest flex items-center gap-1.5 underline underline-offset-4">
              <MessageSquare className="w-3.5 h-3.5" /> 粘贴微信记录
            </button>
          </div>
          <textarea 
            placeholder="请在此输入客户的原始需求..." 
            className="w-full h-48 bg-stone-50 rounded-2xl p-6 text-[13px] font-medium leading-relaxed resize-none focus:ring-1 focus:ring-brand-ink outline-none border border-stone-200 placeholder:text-stone-300"
          ></textarea>
        </div>

        <div className="bg-white rounded-[32px] p-8 border border-stone-200 shadow-sm">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-6 block">
            附件材料 (PDF/IMG/DOC)
          </label>
          <div className="border-2 border-dashed border-stone-100 rounded-[24px] p-12 flex flex-col items-center justify-center text-center gap-4 bg-stone-50/50">
            <div className="w-14 h-14 bg-white rounded-2xl border border-stone-100 shadow-sm flex items-center justify-center text-stone-300">
              <Paperclip className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-brand-ink uppercase tracking-wider">点击或拖拽上传</p>
              <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-tighter">Support: PDF, JPEG, PNG, DOCX</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setCurrentPage('ANALYSIS')}
          className="w-full bg-brand-ink text-white rounded-[24px] py-6 font-bold uppercase tracking-[0.25em] text-[13px] shadow-2xl flex items-center justify-center gap-4 active:scale-[0.98] transition-all"
        >
          <Sparkles className="w-5 h-5 text-brand-gold animate-pulse" />
          AI 生成方向方案
        </button>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="min-h-screen bg-white pb-16">
      <header className="px-6 py-6 bg-white flex items-center gap-4 border-b border-stone-100 sticky top-0 z-10">
        <button onClick={() => setCurrentPage('CREATE')} className="p-2 -ml-2 text-brand-ink">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <h1 className="text-xl font-serif italic text-brand-ink">需求解析</h1>
      </header>

      <div className="px-6 pt-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-ink text-white rounded-[40px] p-10 shadow-2xl relative overflow-hidden border-[6px] border-stone-100"
        >
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-56 h-56 bg-brand-green rounded-full blur-[100px] opacity-30"></div>
          
          <div className="flex items-center gap-2 mb-10 border-b border-white/10 pb-4">
            <div className="w-6 h-6 bg-brand-green rounded-sm flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-stone-400">Demand Summary</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-x-10 gap-y-10">
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] text-stone-500 uppercase mb-2">Destination</p>
              <p className="text-xl font-serif italic text-white leading-tight">厦门 (鼓浪屿)</p>
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] text-stone-500 uppercase mb-2">Origin</p>
              <p className="text-xl font-serif italic text-white leading-tight">北京总部</p>
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] text-stone-500 uppercase mb-2">Budget</p>
              <p className="text-xl font-serif italic text-white leading-tight">¥ 1.5 - 2.0W</p>
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] text-stone-500 uppercase mb-2">Duration</p>
              <p className="text-xl font-serif italic text-white leading-tight">5 Days</p>
            </div>
            <div className="col-span-2 pt-6 border-t border-white/5">
              <p className="text-[9px] font-bold tracking-[0.2em] text-stone-500 uppercase mb-4">Core Preferences</p>
              <div className="flex flex-wrap gap-2.5">
                {['亲子友好', '不想太赶', '海景酒店', '闽南美食'].map(p => (
                  <span key={p} className="text-[10px] font-bold uppercase tracking-widest border border-white/20 px-4 py-1.5 rounded-full text-white/70">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16">
          <div className="flex items-center justify-between mb-8 border-b border-stone-100 pb-2">
            <h3 className="font-serif text-xl italic text-brand-ink uppercase tracking-tight">AI 规划方案 <span className="text-xs font-sans not-italic font-bold text-stone-300 ml-2">Directional V.1</span></h3>
          </div>

          <div className="space-y-6">
            {[
              { id: 'S1', title: '【慢活鼓浪屿】深度亲子度假', tag: '省心推荐', color: 'bg-brand-green text-white' },
              { id: 'S2', title: '【海滨纵情】科技探秘游', tag: '教育导向', color: 'bg-stone-100 text-stone-600' },
              { id: 'S3', title: '【闽南风情】古镇游学记', tag: '文化导向', color: 'bg-stone-50 text-stone-400' },
            ].map((s, idx) => (
              <motion.div 
                key={s.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setCurrentPage('SCHEMES')}
                className="group border border-stone-100 rounded-[24px] p-6 flex justify-between items-center hover:border-brand-ink transition-all cursor-pointer shadow-sm bg-white"
              >
                <div>
                  <div className={`text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-md inline-block mb-3 ${s.color}`}>
                    {s.tag}
                  </div>
                  <p className="font-bold text-lg text-brand-ink leading-tight">{s.title}</p>
                </div>
                <div 
                  className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-brand-ink group-hover:bg-brand-ink group-hover:text-white transition-all shadow-sm"
                >
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDirectionalSchemes = () => (
    <div className="min-h-screen bg-brand-bg pb-32">
      <header className="px-6 py-6 bg-white flex items-center justify-between border-b border-stone-100 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentPage('HOME')} className="p-2 -ml-2 text-brand-ink">
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <h1 className="text-xl font-serif italic text-brand-ink">方案决策</h1>
        </div>
      </header>

      <div className="px-6 mt-8">
        <div className="bg-white rounded-[40px] overflow-hidden border border-stone-200 shadow-2xl">
          <div className="aspect-[16/11] bg-brand-ink relative">
            <img 
              src="https://picsum.photos/seed/xiamen/1200/800" 
              alt="厦门" 
              className="w-full h-full object-cover opacity-70"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-brand-ink to-transparent">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-brand-gold text-brand-ink text-[10px] font-black px-3 py-1 rounded uppercase tracking-[0.2em]">意向方案 A</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">【慢活鼓浪屿】深度亲子度假</h2>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-100">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">核心亮点</p>
                <p className="text-[12px] font-bold text-brand-ink">鼓浪屿慢步 + 贝壳博物馆</p>
              </div>
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-100">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">餐饮口径</p>
                <p className="text-[12px] font-bold text-brand-ink">私厨闽南菜 + 海景下午茶</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full border-[3px] border-brand-ink bg-white z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-brand-ink rounded-full"></div>
                  </div>
                  <div className="w-px flex-1 bg-stone-100 -my-1"></div>
                </div>
                <div className="pb-8">
                  <p className="text-[11px] font-black text-brand-ink uppercase tracking-widest mb-2">Day 1 Arrival</p>
                  <p className="text-[13px] text-stone-500 leading-relaxed italic">头等舱保姆车接机，入住鼓浪屿私享别墅，看一场绝美落日。</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full border-[3px] border-stone-100 bg-white z-10"></div>
                  <div className="w-px flex-1 bg-stone-100 -my-1"></div>
                </div>
                <div className="pb-8">
                  <p className="text-[11px] font-black text-stone-300 uppercase tracking-widest mb-2">Day 2 Exploration</p>
                  <p className="text-[13px] text-stone-300 leading-relaxed">专属导览漫步钢琴岛，走进非遗漆线雕，夜晚欣赏海上歌剧。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto no-scrollbar pb-6 px-1">
          <button className="flex-shrink-0 px-8 py-5 rounded-2xl bg-brand-ink text-white font-bold text-[12px] uppercase tracking-widest flex items-center gap-3 shadow-xl">
            Selected A <CheckCircle2 className="w-4 h-4 text-brand-gold" />
          </button>
          <button className="flex-shrink-0 px-8 py-5 rounded-2xl bg-white border border-stone-200 text-stone-400 font-bold text-[12px] uppercase tracking-widest hover:text-brand-ink hover:border-brand-ink transition-all">
            Sch. B
          </button>
          <button className="flex-shrink-0 px-8 py-5 rounded-2xl bg-white border border-stone-200 text-stone-400 font-bold text-[12px] uppercase tracking-widest hover:text-brand-ink hover:border-brand-ink transition-all">
            Sch. C
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-stone-100 flex gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
        <button className="flex-1 border-2 border-stone-200 text-brand-ink py-5 rounded-[20px] font-bold text-[13px] uppercase tracking-widest flex items-center justify-center gap-3 active:bg-stone-50 transition-colors">
          <Send className="w-4 h-4" /> 分享方向
        </button>
        <button 
          onClick={() => setCurrentPage('9_9_PAY')}
          className="flex-1 bg-brand-ink text-white py-5 rounded-[20px] font-bold text-[13px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-transform"
        >
          <CreditCard className="w-4 h-4 text-brand-gold" /> 9.9 锁客
        </button>
      </div>
    </div>
  );

  const renderPayment99 = () => (
    <div className="min-h-screen bg-brand-bg">
      <header className="px-6 py-6 bg-white flex items-center gap-4 border-b border-stone-100 sticky top-0 z-10">
        <button onClick={() => setCurrentPage('SCHEMES')} className="p-2 -ml-2 text-brand-ink">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <h1 className="text-xl font-serif italic text-brand-ink">服务费确认</h1>
      </header>

      <div className="px-10 pt-16 flex flex-col items-center">
        <div className="w-32 h-32 bg-stone-50 rounded-[40px] flex items-center justify-center mb-8 border border-stone-100 shadow-sm relative">
          <ShieldCheck className="w-16 h-16 text-brand-gold" />
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-green rounded-full border-4 border-white flex items-center justify-center text-[10px] text-white font-black">9.9</div>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-brand-ink">意向服务确认</h2>
        <p className="text-stone-400 text-center mt-4 max-w-xs text-[13px] leading-relaxed font-medium">
          支付极轻服务费，解锁专家级一对一深度定制与官方权益保障。
        </p>

        <div className="w-full bg-white rounded-[32px] p-10 mt-16 border border-stone-200 shadow-xl relative">
          <div className="absolute top-0 left-10 -mt-4 bg-brand-ink text-white text-[9px] px-4 py-2 rounded-full font-black uppercase tracking-widest">Order Details</div>
          
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">服务类别</span>
            <span className="text-sm font-bold text-brand-ink">深度定制 · 尊享私团</span>
          </div>
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">执行顾问</span>
            <span className="text-sm font-bold text-brand-ink">Consultant Henry</span>
          </div>
          <div className="h-px bg-stone-100 mb-8"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-brand-ink uppercase tracking-tighter">Amount Due</span>
            <span className="text-4xl font-serif italic font-black text-brand-ink">¥ 9.90</span>
          </div>
        </div>

        <div className="w-full mt-16 space-y-4">
          <button 
            onClick={() => {
              setOrders(prev => prev.map(o => o.customerName === '李先生' ? {...o, serviceFeeStatus: 'SUCCESS'} as WorkOrder : o));
              setTimeout(() => setCurrentPage('DEEP_CUSTOM'), 500);
            }}
            className="w-full bg-brand-ink text-white py-6 rounded-[24px] font-bold uppercase tracking-[0.2em] text-[13px] shadow-2xl active:scale-95 transition-all"
          >
            确认支付并锁客
          </button>
          <button className="w-full py-4 text-stone-300 text-[11px] font-bold uppercase tracking-widest hover:text-brand-ink transition-colors">
            豁免服务费 (后台确认)
          </button>
        </div>
      </div>
    </div>
  );

  const renderDeepCustomization = () => (
    <div className="min-h-screen bg-brand-bg pb-32">
      <header className="px-6 py-6 bg-white flex items-center justify-between border-b border-stone-100 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentPage('HOME')} className="p-2 -ml-2 text-brand-ink">
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <h1 className="text-xl font-serif italic text-brand-ink">深度协作区</h1>
        </div>
        <div className="flex items-center gap-3 bg-brand-green/10 px-4 py-1.5 rounded-full text-brand-green text-[10px] font-black tracking-widest uppercase border border-brand-green/20">
          <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse"></div>
          Manual Editing
        </div>
      </header>

      <div className="px-6 mt-8 space-y-8">
        <div className="bg-white rounded-[32px] p-8 border border-stone-200 shadow-sm relative">
          <div className="absolute top-8 right-8 flex gap-2">
            <button className="w-10 h-10 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-400 hover:text-brand-ink transition-colors">
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em] mb-6">顾问人工修改 (V2.0)</p>
          
          <div className="space-y-8">
            <div className="p-6 bg-stone-50/50 rounded-2xl border-l-[6px] border-brand-ink">
              <input type="text" className="bg-transparent font-black text-brand-ink outline-none w-full mb-2 uppercase tracking-tight text-sm" defaultValue="Day 1 尊享抵达" />
              <textarea 
                className="w-full bg-transparent text-[13px] text-stone-500 font-medium outline-none resize-none h-20 leading-relaxed italic" 
                defaultValue="私人管家于机场出口迎接，定制林肯领航员接站，直达鼓浪屿悦榕庄私密墅区。"
              />
            </div>
            <div className="p-6 bg-stone-50/20 rounded-2xl border-l-[6px] border-stone-100">
              <input type="text" className="bg-transparent font-bold text-stone-300 outline-none w-full mb-2 uppercase tracking-tight text-sm" defaultValue="Day 2 琴岛私享慢行" />
              <textarea 
                className="w-full bg-transparent text-[13px] text-stone-300 font-medium outline-none resize-none h-20 leading-relaxed" 
                defaultValue="避开游客人潮，清晨探索。午后于百年洋楼公馆享用定制英式下午茶。"
              />
            </div>
          </div>

          <button className="w-full mt-8 py-5 flex items-center justify-center gap-3 text-[11px] font-black text-stone-400 uppercase tracking-widest border-2 border-dashed border-stone-100 rounded-2xl hover:text-brand-ink hover:border-stone-200 transition-all">
            <PlusCircle className="w-4 h-4" /> Add Next Node
          </button>
        </div>

        <div className="bg-brand-ink rounded-[40px] p-8 shadow-2xl relative overflow-hidden border-[6px] border-stone-50">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-gold rounded-full blur-[80px] opacity-20"></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 opacity-20 bg-white rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.3em]">AI Expression Polishing</p>
          </div>
          <h3 className="text-white font-serif italic text-lg leading-relaxed mb-6">
            我们将为您打造一场“时空穿梭”的岛屿奢旅。不仅是脚步的丈量，更是灵魂在繁花与海浪间的共鸣...
          </h3>
          <p className="text-stone-500 text-[10px] leading-relaxed uppercase tracking-tighter">AI 建议：将原有的“接机”表达升级为“尊享抵达”语境，强化仪式感。</p>
          <div className="flex gap-4 mt-8">
            <button className="flex-1 bg-white text-brand-ink py-4 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">采纳</button>
            <button className="flex-1 border border-white/20 text-white/50 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors">重置</button>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-8 border border-stone-200 shadow-sm">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em] mb-6">正式报价单组装 (CNY)</p>
          <div className="space-y-6">
            <div className="flex justify-between items-center py-4 border-b border-stone-50">
              <span className="text-[11px] font-black text-brand-ink uppercase tracking-tight">ADULT x 2</span>
              <input type="number" defaultValue={8800} className="w-32 text-right font-serif italic text-xl text-brand-ink outline-none bg-transparent" />
            </div>
            <div className="flex justify-between items-center py-4 border-b border-stone-50">
              <span className="text-[11px] font-black text-brand-ink uppercase tracking-tight">CHILD x 1</span>
              <input type="number" defaultValue={4200} className="w-32 text-right font-serif italic text-xl text-brand-ink outline-none bg-transparent" />
            </div>
            <div className="flex justify-between items-center pt-8">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Total Price</span>
              <span className="text-3xl font-black text-brand-ink italic font-serif">¥ 21,800</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-stone-100 flex gap-4 shadow-2xl z-20">
        <button 
          onClick={() => setCurrentPage('PDF')}
          className="flex-1 bg-brand-ink text-white py-5 rounded-[20px] font-bold text-[13px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-transform"
        >
          <FileDown className="w-4 h-4 text-brand-gold" /> 交付画册 PDF
        </button>
        <button 
          onClick={() => setCurrentPage('DEPOSIT')}
          className="flex-1 border-2 border-brand-ink text-brand-ink py-5 rounded-[20px] font-bold text-[13px] uppercase tracking-widest flex items-center justify-center gap-3 active:bg-stone-50 transition-colors"
        >
          <CreditCard className="w-4 h-4" /> 确认定金
        </button>
      </div>
    </div>
  );

  const renderDeposit = () => (
    <div className="min-h-screen bg-brand-ink flex flex-col items-center justify-center px-10 py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-gold/10 to-transparent pointer-events-none"></div>
      
      <div className="w-24 h-24 bg-white/5 rounded-[40px] flex items-center justify-center mb-10 z-10 shadow-3xl border border-white/10">
        <CreditCard className="w-12 h-12 text-brand-gold" />
      </div>
      <h2 className="text-3xl font-serif italic text-white tracking-tight text-center z-10 uppercase">定金锁定环节</h2>
      <p className="text-white/40 text-center mt-4 text-[13px] leading-relaxed mb-16 z-10 font-medium uppercase tracking-widest">
        已确认方案 V3.5 正式版。支付 ¥ 5,000 以启动全流程资源控权与管家介入。
      </p>

      <div className="w-full bg-white/5 rounded-[40px] p-10 border border-white/10 mb-16 z-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 -mr-16 -mt-16"></div>
        <div className="flex flex-col gap-2 mb-10">
          <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">Final Preview</span>
          <h3 className="text-2xl font-serif italic text-white">厦门慢活 5日 尊享私团</h3>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">Required Deposit</span>
            <span className="text-5xl font-serif italic font-black text-white">¥ 5,000</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-brand-gold text-brand-ink text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
            Finalized
          </div>
        </div>
      </div>

      <div className="w-full space-y-5 z-10 text-center">
        <button 
          onClick={() => {
            setOrders(prev => prev.map(o => o.customerName === '李先生' ? {...o, depositStatus: 'SUCCESS', status: 'COMPLETED'} as WorkOrder : o));
            setTimeout(() => setCurrentPage('HOME'), 500);
          }}
          className="w-full bg-white text-brand-ink py-6 rounded-[24px] font-black uppercase tracking-[0.3em] text-[13px] shadow-2xl active:scale-95 transition-all"
        >
          确定定金已到账
        </button>
        <button 
          onClick={() => setCurrentPage('DEEP_CUSTOM')}
          className="py-4 text-white/20 text-[10px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-3 hover:text-white/60 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Customization
        </button>
      </div>
    </div>
  );

  const renderPDFPreview = () => (
    <div className="min-h-screen bg-brand-bg">
       <header className="px-6 py-6 bg-white flex items-center justify-between border-b border-stone-100 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentPage('DEEP_CUSTOM')} className="p-2 -ml-2 text-brand-ink">
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <h1 className="text-xl font-serif italic text-brand-ink">画册 PDF 预览</h1>
        </div>
        <button 
          onClick={() => setCurrentPage('HOME')}
          className="bg-brand-ink text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all"
        >
          SEND
        </button>
      </header>

      <div className="p-10 bg-stone-50 flex justify-center border-b border-stone-100">
        <div className="w-full max-w-[340px] aspect-[1/1.41] bg-white shadow-3xl rounded-sm py-16 px-12 flex flex-col border border-stone-200">
          <div className="flex justify-between items-start mb-24">
            <div className="font-serif italic text-5xl text-stone-100 select-none">LUBAO</div>
            <div className="text-[9px] font-black text-stone-300 uppercase tracking-[0.4em] transform rotate-90 origin-right -mt-2">SEASON 2024</div>
          </div>
          
          <div className="flex-1">
            <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.5em] mb-6 block border-b border-stone-50 pb-2">EXCLUSIVE EDITION</span>
            <h1 className="text-5xl font-light tracking-tighter leading-[0.9] mb-10 text-brand-ink font-serif italic">
              岛屿之诗：<br/>
              <span className="font-black not-italic text-4xl">小包团深度漫行</span>
            </h1>
            <div className="w-10 h-px bg-brand-ink mb-6"></div>
            <p className="text-[11px] text-stone-400 font-bold italic tracking-tighter">Exclusively prepared for Mr. Li & Family</p>
          </div>

          <div className="mt-auto pt-10 border-t border-stone-100">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[8px] font-black text-stone-300 uppercase tracking-[0.5em] mb-2">Location</p>
                <p className="text-xs font-black tracking-tight text-brand-ink uppercase">Xiamen, Fujian</p>
              </div>
              <div>
                <p className="text-[8px] font-black text-stone-300 uppercase tracking-[0.5em] mb-2">Period</p>
                <p className="text-xs font-black tracking-tight text-brand-ink uppercase">05 Days Plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-12">
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-400 mb-8 border-b border-stone-50 pb-4">Select Output Layout</h4>
        <div className="grid grid-cols-3 gap-6">
          <div className="aspect-[1/1.41] bg-white rounded-lg border-[3px] border-brand-ink p-2 cursor-pointer shadow-xl relative">
            <div className="w-full h-full bg-stone-50 rounded-sm"></div>
            <div className="absolute top-2 right-2 w-4 h-4 bg-brand-ink rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div className="aspect-[1/1.41] bg-stone-100 rounded-lg border border-stone-200 p-2 cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
            <div className="w-full h-full bg-brand-ink/5 rounded-sm"></div>
          </div>
          <div className="aspect-[1/1.41] bg-stone-100 rounded-lg border border-stone-200 p-2 cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
            <div className="w-full h-full bg-brand-gold/10 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative max-w-md mx-auto bg-white min-h-screen shadow-2xl font-sans overflow-x-hidden transition-colors selection:bg-brand-gold/30 border-x border-stone-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="min-h-screen"
        >
          {currentPage === 'HOME' && renderHome()}
          {currentPage === 'CREATE' && renderCreateRequest()}
          {currentPage === 'ANALYSIS' && renderAnalysis()}
          {currentPage === 'SCHEMES' && renderDirectionalSchemes()}
          {currentPage === '9_9_PAY' && renderPayment99()}
          {currentPage === 'DEEP_CUSTOM' && renderDeepCustomization()}
          {currentPage === 'DEPOSIT' && renderDeposit()}
          {currentPage === 'PDF' && renderPDFPreview()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
