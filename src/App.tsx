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
  const [currentPage, setCurrentPage] = useState<'HOME' | 'CREATE' | 'ANALYSIS' | 'SCHEMES' | '9_9_PAY' | 'DEEP_CUSTOM' | 'DEPOSIT' | 'PDF' | 'ITINERARY_EDIT'>('HOME');
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);
  const [orders, setOrders] = useState<WorkOrder[]>(MOCK_WORK_ORDERS);
  const [activeDay, setActiveDay] = useState(1);

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
        <section className="mt-8">
          {orders.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-6 border-b border-stone-100 pb-2">
                <h2 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em]">进行中的项目</h2>
                <span className="text-[10px] font-bold text-stone-300">{orders.length} 待办</span>
              </div>
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-[24px] p-6 border border-stone-200 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-black text-brand-ink">{order.customerName}</h3>
                      <p className="text-[11px] text-stone-400 font-bold uppercase tracking-widest mt-1">{order.id} · {order.customerContact}</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-100 text-[9px] font-black uppercase tracking-[0.2em] text-brand-ink flex items-center gap-1.5 shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
                      {order.status === 'DIRECTIONAL_SCHEMES' && '意向沟通中'}
                      {order.status === '9_9_PAYMENT' && '待付意向金'}
                      {order.status === 'DEEP_CUSTOM' && '深度定制中'}
                      {order.status === 'DEPOSIT' && '待付定金'}
                      {order.status === 'COMPLETED' && '已定案'}
                    </div>
                  </div>
                  <div className="text-[12px] text-stone-500 italic line-clamp-1 bg-stone-50 p-3 rounded-xl border border-stone-100">
                    "{order.demandSources[0]?.content}"
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-stone-50 mt-1">
                    <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none">{order.createdAt}</span>
                    <button 
                      onClick={() => {
                        setSelectedOrder(order);
                        if(order.status === 'DIRECTIONAL_SCHEMES') setCurrentPage('SCHEMES');
                        else if(order.status === '9_9_PAYMENT') setCurrentPage('9_9_PAY');
                        else if(order.status === 'DEEP_CUSTOM') setCurrentPage('DEEP_CUSTOM');
                        else if(order.status === 'DEPOSIT') setCurrentPage('DEPOSIT');
                        else setCurrentPage('SCHEMES');
                      }}
                      className="text-[11px] font-black text-brand-ink flex items-center gap-1 uppercase tracking-widest active:scale-95 transition-transform"
                    >
                      继续跟进 <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[32px] p-10 border border-stone-200 shadow-sm text-center">
              <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-ink border border-stone-100">
                <PlusCircle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-serif italic text-brand-ink mb-2">暂无待办工单</h2>
              <p className="text-[12px] text-stone-400 font-medium uppercase tracking-widest mb-8">开始收集客户信息以开启定制</p>
              <button 
                onClick={() => setCurrentPage('CREATE')}
                className="w-full bg-brand-ink text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg active:scale-95 transition-all"
              >
                新建客户需求
              </button>
            </div>
          )}
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
          <span className="text-[10px] font-black uppercase tracking-widest mt-3 text-brand-ink">新增</span>
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
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em] mb-8">客户核心信息采集</p>
          <div className="space-y-8">
            <div className="border-b border-stone-100 pb-4">
              <label className="text-[10px] font-bold text-stone-300 uppercase tracking-widest block mb-2">客户姓名 / 称呼</label>
              <input type="text" placeholder="请输入客户姓名" className="w-full bg-transparent text-lg font-bold text-brand-ink outline-none border-none placeholder:text-stone-200" />
            </div>
            <div className="border-b border-stone-100 pb-4">
              <label className="text-[10px] font-bold text-stone-300 uppercase tracking-widest block mb-2">联系电话 / 微信</label>
              <input type="text" placeholder="用于同步方案" className="w-full bg-transparent text-lg font-bold text-brand-ink outline-none border-none placeholder:text-stone-200" />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="border-b border-stone-100 pb-4">
                <label className="text-[10px] font-bold text-stone-300 uppercase tracking-widest block mb-2">出行人数</label>
                <input type="number" placeholder="2" className="w-full bg-transparent text-lg font-bold text-brand-ink outline-none border-none placeholder:text-stone-200" />
              </div>
              <div className="border-b border-stone-100 pb-4">
                <label className="text-[10px] font-bold text-stone-300 uppercase tracking-widest block mb-2">预算范围</label>
                <input type="text" placeholder="2-3W" className="w-full bg-transparent text-lg font-bold text-brand-ink outline-none border-none placeholder:text-stone-200" />
              </div>
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
              <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-tighter">支持格式: PDF, JPEG, PNG, DOCX</p>
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
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-stone-400">需求摘要</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-x-10 gap-y-10">
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] text-stone-500 uppercase mb-2">目的地</p>
              <p className="text-xl font-serif italic text-white leading-tight">厦门 (鼓浪屿)</p>
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] text-stone-500 uppercase mb-2">出发地</p>
              <p className="text-xl font-serif italic text-white leading-tight">北京总部</p>
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] text-stone-500 uppercase mb-2">预算</p>
              <p className="text-xl font-serif italic text-white leading-tight">¥ 1.5 - 2.0W</p>
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] text-stone-500 uppercase mb-2">天数</p>
              <p className="text-xl font-serif italic text-white leading-tight">5 Days</p>
            </div>
            <div className="col-span-2 pt-6 border-t border-white/5">
              <p className="text-[9px] font-bold tracking-[0.2em] text-stone-500 uppercase mb-4">核心偏好</p>
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
            <h3 className="font-serif text-xl italic text-brand-ink uppercase tracking-tight">AI 规划方案 <span className="text-xs font-sans not-italic font-bold text-stone-300 ml-2">初稿版本 V.1</span></h3>
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
                  <p className="text-[11px] font-black text-brand-ink uppercase tracking-widest mb-2">第一天 抵达</p>
                  <p className="text-[13px] text-stone-500 leading-relaxed italic">头等舱保姆车接机，入住鼓浪屿私享别墅，看一场绝美落日。</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full border-[3px] border-stone-100 bg-white z-10"></div>
                  <div className="w-px flex-1 bg-stone-100 -my-1"></div>
                </div>
                <div className="pb-8">
                  <p className="text-[11px] font-black text-stone-300 uppercase tracking-widest mb-2">第二天 探索</p>
                  <p className="text-[13px] text-stone-300 leading-relaxed">专属导览漫步钢琴岛，走进非遗漆线雕，夜晚欣赏海上歌剧。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto no-scrollbar pb-6 px-1">
          <button className="flex-shrink-0 px-8 py-5 rounded-2xl bg-brand-ink text-white font-bold text-[12px] uppercase tracking-widest flex items-center gap-3 shadow-xl cursor-default">
            已选 A <CheckCircle2 className="w-4 h-4 text-brand-gold" />
          </button>
          <button 
            onClick={() => window.location.href = 'https://www.fliggy.com'}
            className="flex-shrink-0 px-8 py-5 rounded-2xl bg-white border border-stone-200 text-stone-400 font-bold text-[12px] uppercase tracking-widest hover:text-brand-ink hover:border-brand-ink transition-all active:scale-95"
          >
            方案 B
          </button>
          <button 
            onClick={() => window.location.href = 'https://www.ctrip.com'}
            className="flex-shrink-0 px-8 py-5 rounded-2xl bg-white border border-stone-200 text-stone-400 font-bold text-[12px] uppercase tracking-widest hover:text-brand-ink hover:border-brand-ink transition-all active:scale-95"
          >
            方案 C
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
          <div className="absolute top-0 left-10 -mt-4 bg-brand-ink text-white text-[9px] px-4 py-2 rounded-full font-black uppercase tracking-widest">订单详情</div>
          
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">服务类别</span>
            <span className="text-sm font-bold text-brand-ink">深度定制 · 尊享私团</span>
          </div>
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">执行顾问</span>
            <span className="text-sm font-bold text-brand-ink">顾问 Henry</span>
          </div>
          <div className="h-px bg-stone-100 mb-8"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-brand-ink uppercase tracking-tighter">应付金额</span>
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
          顾问人工编辑中
        </div>
      </header>

      <div className="px-6 mt-8 space-y-8">
        <div className="bg-white rounded-[32px] p-8 border border-stone-200 shadow-sm relative">
          <div className="absolute top-8 right-8 flex gap-2">
            <button 
              onClick={() => setCurrentPage('ITINERARY_EDIT')}
              className="w-10 h-10 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-400 hover:text-brand-ink hover:border-brand-ink transition-all shadow-sm"
            >
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
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.3em]">AI 润色修辞</p>
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
              <span className="text-[11px] font-black text-brand-ink uppercase tracking-tight">成人 x 2</span>
              <input type="number" defaultValue={8800} className="w-32 text-right font-serif italic text-xl text-brand-ink outline-none bg-transparent" />
            </div>
            <div className="flex justify-between items-center py-4 border-b border-stone-50">
              <span className="text-[11px] font-black text-brand-ink uppercase tracking-tight">儿童 x 1</span>
              <input type="number" defaultValue={4200} className="w-32 text-right font-serif italic text-xl text-brand-ink outline-none bg-transparent" />
            </div>
            <div className="flex justify-between items-center pt-8">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">总价合计</span>
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
          <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">最终预览</span>
          <h3 className="text-2xl font-serif italic text-white">厦门慢活 5日 尊享私团</h3>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">待付定金</span>
            <span className="text-5xl font-serif italic font-black text-white">¥ 5,000</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-brand-gold text-brand-ink text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
            已定案
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

  const [activePdfPage, setActivePdfPage] = useState(1);

  const renderPDFPreview = () => {
    const totalPages = 5;
    
    const renderPageContent = () => {
      switch(activePdfPage) {
        case 1: // Cover
          return (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-12">
                <div className="font-serif italic text-4xl text-stone-100 select-none">LUBAO</div>
                <div className="text-[9px] font-black text-stone-300 uppercase tracking-[0.4em] transform rotate-90 origin-right -mt-2">2024 季度</div>
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.5em] mb-4 block border-b border-stone-50 pb-2">尊享限定版本</span>
                <h1 className="text-4xl font-light tracking-tighter leading-[0.95] mb-8 text-brand-ink font-serif italic">
                  岛屿之诗：<br/>
                  <span className="font-black not-italic text-3xl">小包团深度漫行</span>
                </h1>
                <div className="w-8 h-px bg-brand-ink mb-4"></div>
                <p className="text-[10px] text-stone-400 font-bold italic tracking-tighter">专为 李先生及其家人 制作</p>
              </div>
              <div className="mt-auto pt-6 border-t border-stone-100">
                <div className="flex justify-between items-end text-[10px]">
                  <div>
                    <p className="text-[8px] font-black text-stone-300 uppercase tracking-[0.5em] mb-1">目的地</p>
                    <p className="font-black tracking-tight text-brand-ink uppercase">福建 厦门</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-stone-300 uppercase tracking-[0.5em] mb-1">周期</p>
                    <p className="font-black tracking-tight text-brand-ink uppercase">5天 行程计划</p>
                  </div>
                </div>
              </div>
            </div>
          );
        case 2: // Welcome Message
          return (
            <div className="flex flex-col h-full text-brand-ink overflow-hidden">
              <p className="text-[8px] font-black text-stone-300 uppercase tracking-[0.4em] mb-8">致 远方的客人 / WELCOME</p>
              <h2 className="text-2xl font-serif italic mb-6 leading-tight">致 李先生的一封信</h2>
              <div className="space-y-4 text-[12px] font-medium leading-relaxed italic text-stone-500 overflow-y-auto no-scrollbar pb-4">
                <p>在这个喧嚣的世界，我们总在寻找一片能让灵魂栖息的净土。厦门，这座被海风吻过的岛屿，正是我们为您挑选的答案。</p>
                <p>我们避开了常规的打卡路径，邀请您走进那些被时光遗忘的老洋楼，在鼓浪屿的晨曦中听一场私人的钢琴独奏，在傍晚的别墅露台看金辉下的红砖绿瓦。</p>
                <p>这不仅仅是一次旅行，更是一场关于“慢”的艺术实践。万物已备，只待您启。</p>
              </div>
              <div className="mt-auto flex justify-between items-end border-t border-stone-50 pt-6">
                <div>
                  <p className="text-[9px] font-black text-stone-300 uppercase tracking-widest mb-1">执行顾问助理</p>
                  <p className="text-[12px] font-serif italic font-black">Henry Zhang</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                </div>
              </div>
            </div>
          );
        case 3: // Daily Highlight Grid
          return (
            <div className="flex flex-col h-full text-brand-ink">
              <p className="text-[8px] font-black text-stone-300 uppercase tracking-[0.4em] mb-8">行程全景预览 / ITINERARY</p>
              <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pr-1">
                {[
                  { day: '01', title: '海风入梦', desc: '领航员接机，入住私密别墅' },
                  { day: '02', title: '琴岛私享', desc: '清晨避开人潮的私谧漫行' },
                  { day: '03', title: '非遗记忆', desc: '漆线雕艺术工坊现场体验' },
                  { day: '04', title: '自然回音', desc: '环岛路帆船出海，拥抱深蓝' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start border-l border-stone-100 pl-4 relative">
                    <div className="absolute -left-[3px] top-0 w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
                    <div>
                      <span className="text-[8px] font-black text-stone-300">第 {item.day} 天</span>
                      <h4 className="text-[12px] font-black mb-0.5">{item.title}</h4>
                      <p className="text-[10px] text-stone-400 italic leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-24 bg-stone-50 rounded-xl overflow-hidden relative">
                <img src="https://picsum.photos/seed/travel/400/200" className="w-full h-full object-cover opacity-30 saturate-0" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[8px] font-black uppercase tracking-[0.5em] text-brand-ink">探索更多之旅 / Explore</p>
                </div>
              </div>
            </div>
          );
        case 4: // Accommodation Feature
          return (
             <div className="flex flex-col h-full text-brand-ink">
              <p className="text-[8px] font-black text-stone-300 uppercase tracking-[0.4em] mb-8">下榻美学 / ACCOMMODATION</p>
              <div className="overflow-hidden rounded-2xl mb-4 shadow-lg h-40">
                <img src="https://picsum.photos/seed/hotel/600/600" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-xl font-serif italic mb-2 leading-tight">鼓浪屿悦榕庄</h3>
              <p className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">私密别墅区 · 私人管家服务</p>
              <p className="text-[11px] font-medium leading-relaxed italic text-stone-500 line-clamp-3 mb-6">
                我们为您精心挑选了位于核心地段的私密独栋别墅。不仅能避开日间喧嚣，更能独享一整晚的海浪声。
              </p>
              <div className="mt-auto grid grid-cols-2 gap-3">
                <div className="h-16 bg-stone-50 rounded-lg flex flex-col items-center justify-center border border-stone-100">
                   <p className="text-[7px] font-black text-stone-300 uppercase mb-0.5">床型配置</p>
                   <p className="text-[9px] font-bold">特大号豪华床</p>
                </div>
                <div className="h-16 bg-stone-50 rounded-lg flex flex-col items-center justify-center border border-stone-100">
                   <p className="text-[7px] font-black text-stone-300 uppercase mb-0.5">窗外景观</p>
                   <p className="text-[9px] font-bold">全景玻璃海景</p>
                </div>
              </div>
            </div>
          );
        case 5: // Back Cover
           return (
            <div className="flex flex-col h-full text-brand-ink items-center justify-center text-center">
              <div className="w-24 h-24 mb-12 rounded-full border-[10px] border-stone-50 flex items-center justify-center opacity-20">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h2 className="text-4xl font-serif italic mb-4">LUBAO</h2>
              <p className="text-[10px] font-black text-stone-300 uppercase tracking-[0.8em] mb-20">小包团私人定制 · 尊享服务</p>
              
              <div className="space-y-4 border-t border-stone-50 pt-10 w-full">
                <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">全国统一服务中心</p>
                <p className="text-[12px] font-bold">400-888-9999</p>
                <p className="text-[9px] font-medium text-stone-300 italic">扫码关注获取实时出单状态</p>
              </div>
              
              <div className="mt-20 w-16 h-16 bg-stone-50 rounded-lg border border-stone-100 flex items-center justify-center">
                <div className="w-10 h-10 bg-brand-ink rounded flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    return (
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
            发送
          </button>
        </header>

        <div className="p-8 bg-stone-50 flex flex-col items-center gap-6 border-b border-stone-100 overflow-hidden">
          {/* Main Booklet Container */}
          <div className="relative group [perspective:1000px]">
            <motion.div 
              key={activePdfPage}
              initial={{ rotateY: 45, opacity: 0, scale: 0.95 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="w-[300px] h-[424px] bg-white shadow-2xl rounded-sm py-12 px-8 flex flex-col border border-stone-200 relative z-10 overflow-hidden"
            >
              {renderPageContent()}
            </motion.div>
            {/* Page Shadow/Stack Effect */}
            <div className="absolute inset-0 bg-stone-100 rounded-sm translate-x-1 translate-y-1 -z-10 shadow-lg"></div>
            <div className="absolute inset-0 bg-stone-50 rounded-sm translate-x-2 translate-y-2 -z-20 shadow-md"></div>
          </div>

          {/* Page Indicators */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePdfPage(i + 1)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  activePdfPage === i + 1 
                  ? 'bg-brand-ink w-6' 
                  : 'bg-stone-200'
                }`}
              />
            ))}
          </div>

          {/* Page Navigation Controls */}
          <div className="flex gap-3">
            <button 
              disabled={activePdfPage === 1}
              onClick={() => setActivePdfPage(p => p - 1)}
              className="px-6 py-2.5 rounded-full bg-white border border-stone-200 text-[10px] font-black uppercase tracking-[0.2em] text-brand-ink disabled:opacity-30 disabled:cursor-not-allowed active:bg-stone-50 transition-all"
            >
              上一页
            </button>
            <button 
              disabled={activePdfPage === totalPages}
              onClick={() => setActivePdfPage(p => p + 1)}
              className="px-6 py-2.5 rounded-full bg-brand-ink text-white text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-30 disabled:cursor-not-allowed shadow-lg active:scale-95 transition-all"
            >
              下一页
            </button>
          </div>
        </div>
        
        <div className="px-6 py-12">
          <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-400 mb-8 border-b border-stone-50 pb-4">选择输出版式</h4>
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
    );
  };

  const renderItineraryEdit = () => (
    <div className="min-h-screen bg-brand-bg pb-32">
       <header className="px-6 py-6 bg-white flex items-center justify-between border-b border-stone-100 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentPage('DEEP_CUSTOM')} className="p-2 -ml-2 text-brand-ink">
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <h1 className="text-xl font-serif italic text-brand-ink">精修每日行程</h1>
        </div>
        <button 
          onClick={() => setCurrentPage('DEEP_CUSTOM')}
          className="bg-brand-ink text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all"
        >
          保存
        </button>
      </header>

      <div className="px-6 py-8">
        {/* Day Selector */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar mb-10 pb-2">
          {[1, 2, 3, 4, 5].map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`flex-shrink-0 w-16 h-20 rounded-[20px] flex flex-col items-center justify-center transition-all ${
                activeDay === day 
                ? 'bg-brand-ink text-white shadow-xl scale-110' 
                : 'bg-white text-stone-300 border border-stone-100'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-tighter mb-1">Day</span>
              <span className="text-2xl font-serif italic">{day}</span>
            </button>
          ))}
          <button className="flex-shrink-0 w-16 h-20 rounded-[20px] border-2 border-dashed border-stone-100 flex items-center justify-center text-stone-200">
            <PlusCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-12">
          {/* Time Segments */}
          {['Morning / 上午', 'Afternoon / 下午', 'Evening / 晚上'].map((segment, idx) => (
            <div key={segment} className="relative pl-10">
              {/* Vertical Timeline line */}
              <div className="absolute left-[11px] top-0 bottom-0 w-px bg-stone-100"></div>
              <div className="absolute left-0 top-0 w-6 h-6 rounded-full border-2 border-brand-ink bg-white flex items-center justify-center z-10 shadow-sm">
                <div className="w-1.5 h-1.5 bg-brand-ink rounded-full"></div>
              </div>

              <div className="mb-6">
                <h3 className="text-[11px] font-black text-brand-ink uppercase tracking-widest mb-6 py-1 px-4 bg-stone-50 inline-block rounded-lg">{segment}</h3>
                
                <div className="bg-white rounded-[32px] p-8 border border-stone-200 shadow-sm space-y-8">
                  {/* POI Section */}
                  <div>
                    <label className="text-[10px] font-black text-stone-300 uppercase tracking-widest block mb-4">景点安排 (POI)</label>
                    <div className="flex flex-wrap gap-3">
                      <div className="px-4 py-2 bg-stone-50 rounded-xl border border-stone-100 text-[12px] font-bold text-brand-ink flex items-center gap-2">
                        {idx === 0 ? '鼓浪屿日光岩' : idx === 1 ? '菽庄花园' : '中山路步行街'}
                        <button className="text-stone-300 hover:text-red-400">×</button>
                      </div>
                      <button className="px-4 py-2 border-2 border-dashed border-stone-100 rounded-xl text-[10px] font-bold text-stone-300 flex items-center gap-2">
                        <PlusCircle className="w-3.5 h-3.5" /> 添加景点
                      </button>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div>
                    <label className="text-[10px] font-black text-stone-300 uppercase tracking-widest block mb-4">活动描述</label>
                    <textarea 
                      placeholder="描述本阶段的内容..."
                      className="w-full h-24 bg-stone-50/50 rounded-2xl p-4 text-[13px] font-medium outline-none resize-none border border-stone-100 placeholder:text-stone-200 focus:bg-white focus:border-brand-ink transition-colors"
                    ></textarea>
                  </div>

                  {/* Highlights/Notes (Suggested Additions) */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black text-stone-300 uppercase tracking-widest block mb-4">交通方式</label>
                      <select className="w-full bg-stone-50 rounded-xl p-3 text-[12px] font-bold text-brand-ink outline-none border border-stone-100">
                        <option>私人房车</option>
                        <option>轮渡</option>
                        <option>漫步</option>
                        <option>商务别克</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-stone-300 uppercase tracking-widest block mb-4">游玩小贴士</label>
                      <input type="text" placeholder="如：需备防晒" className="w-full bg-stone-50 rounded-xl p-3 text-[12px] font-bold text-brand-ink outline-none border border-stone-100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Fixed Footer info: Meals & Accom */}
          <div className="bg-brand-ink rounded-[40px] p-10 shadow-2xl relative overflow-hidden text-white border-[6px] border-white">
             <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-gold rounded-full blur-[80px] opacity-20"></div>
             
             <div className="space-y-10">
                <section>
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">当日膳食安排 / Meals</h4>
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                      {['Breakfast', 'Lunch', 'Dinner'].map(meal => (
                        <div key={meal} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                           <p className="text-[8px] font-black text-stone-500 uppercase tracking-widest mb-1">{meal}</p>
                           <input type="text" defaultValue="酒店内 / 私人订制" className="bg-transparent text-[11px] font-bold text-white outline-none w-full" />
                        </div>
                      ))}
                   </div>
                </section>

                <section>
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">下榻酒店 / Accommodation</h4>
                   </div>
                   <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-[8px] font-black text-stone-500 uppercase tracking-widest mb-1">Hotel Name</p>
                        <input type="text" defaultValue="鼓浪屿悦榕庄 (私密别墅区)" className="bg-transparent text-lg font-serif italic text-white outline-none w-full" />
                      </div>
                      <Edit3 className="w-5 h-5 text-brand-gold ml-4" />
                   </div>
                </section>
             </div>
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
          {currentPage === 'ITINERARY_EDIT' && renderItineraryEdit()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
