
import React, { useState, Suspense, lazy } from 'react';
import { ThemeMode, SentimentType, SentimentResult, ConnectionConfig, Language } from './types';
import { EmojiAtom } from './components/EmojiAtom';
import { SentimentDisplay } from './components/SentimentDisplay';
const AnalyticsCharts = lazy(() => import('./components/AnalyticsCharts').then(module => ({ default: module.AnalyticsCharts })));
import { analyzeSentiment } from './services/sentimentService';
import { 
  Sun, Moon, Zap, 
  Terminal, ArrowDown, 
  Send, 
  Database,
  FileJson, FileText, FileCode,
  Globe, Cpu, Layers
} from 'lucide-react';

const translations = {
  es: {
    title: "EMOJIGRAPH",
    subtitle: "Motor de Sentimiento Neuronal 3D",
    terminal: "_PROMPT_DE_TERMINAL",
    execute: "_EJECUTAR_ANALISIS",
    waiting: "ESPERANDO...",
    idleTitle: "SISTEMA_INACTIVO",
    idleSub: "ESPERANDO FLUJO DE DATOS NEURONALES...",
    outputFormats: "_FORMATOS_DE_SALIDA",
    enterprise: "Integración Empresarial",
    enterpriseText: "OPTIMIZADO PARA FLUJOS BIG_DATA. COMPATIBLE CON SPRING_BOOT / PYTHON_ML.",
    dataTypes: "TIPOS DE DATOS ADMITIDOS",
    node: "NODO",
    port: "PUERTO",
    link: "ENLACE",
    established: "ESTABLECIDO_V4",
    lang: "IDIOMA"
  },
  en: {
    title: "EMOJIGRAPH",
    subtitle: "3D Neural Sentiment Engine",
    terminal: "_TERMINAL_PROMPT",
    execute: "_EXECUTE_ANALYSIS",
    waiting: "WAITING...",
    idleTitle: "SYSTEM_IDLE",
    idleSub: "AWAITING NEURAL_FEED DATA FOR RECONSTRUCTION...",
    outputFormats: "_OUTPUT_FORMATS",
    enterprise: "Enterprise Integration",
    enterpriseText: "OPTIMIZED FOR BIG_DATA FLUX. COMPATIBLE WITH SPRING_BOOT / PYTHON_ML.",
    dataTypes: "SUPPORTED DATA TYPES",
    node: "NODE",
    port: "PORT",
    link: "LINK",
    established: "ESTABLISHED_V4",
    lang: "LANGUAGE"
  },
  pt: {
    title: "EMOJIGRAPH",
    subtitle: "Motor de Sentimento Neuronal 3D",
    terminal: "_PROMPT_DE_TERMINAL",
    execute: "_EXECUTAR_ANALISE",
    waiting: "AGUARDANDO...",
    idleTitle: "SISTEMA_INATIVO",
    idleSub: "AGUARDANDO FLUXO DE DADOS NEURONAIS...",
    outputFormats: "_FORMATOS_DE_SAIDA",
    enterprise: "Integração Empresarial",
    enterpriseText: "OTIMIZADO PARA FLUXOS BIG_DATA. COMPATÍVEL COM SPRING_BOOT / PYTHON_ML.",
    dataTypes: "TIPOS DE DADOS SUPORTADOS",
    node: "NÓ",
    port: "PORTA",
    link: "LINK",
    established: "ESTABELECIDO_V4",
    lang: "IDIOMA"
  }
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(ThemeMode.DARK);
  const [lang, setLang] = useState<Language>(Language.ES);
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [conn] = useState<ConnectionConfig>({ endpoint: 'api.emojigraph.io', port: '8080' });

  const t = translations[lang];

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    try {
      const data = await analyzeSentiment(inputText);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isNeon = theme === ThemeMode.NEON;
  const isLight = theme === ThemeMode.LIGHT;

  const dataTypes = [
    { name: "JSON Streams", icon: FileJson },
    { name: "Social Feeds", icon: Globe },
    { name: "User Reviews", icon: FileText },
    { name: "Raw Logs", icon: Cpu }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
      isLight ? 'bg-slate-50 text-slate-900' : 
      theme === ThemeMode.DARK ? 'bg-slate-950 text-slate-100' : 
      'bg-black text-white'
    }`}>
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500 blur-[120px]" />
      </div>

      <header className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center relative z-10 gap-8">
        <div className="flex items-center gap-6">
          <EmojiAtom />
          <div>
            <h1 className={`text-4xl font-bold tracking-tighter flex items-center gap-4 font-pixel ${isNeon ? 'neon-text-cyan' : isLight ? 'text-slate-900' : ''}`}>
              {t.title} <span className={`text-[10px] opacity-70 px-3 py-1 border-4 ${isLight ? 'border-slate-900' : 'border-current'}`}>v4.5_CLI</span>
            </h1>
            <p className={`text-[12px] uppercase mt-2 opacity-60 font-pixel tracking-tighter ${isLight ? 'text-slate-700' : ''}`}>
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Language Switcher */}
          <div className={`flex items-center gap-1 p-1 border-4 ${isNeon ? 'neon-border-cyan' : isLight ? 'border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)]' : 'border-current shadow-[4px_4px_0px_currentColor]'}`}>
            {Object.values(Language).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 font-pixel text-[10px] transition-all uppercase ${
                  lang === l ? (isLight ? 'bg-slate-900 text-white' : 'bg-current text-black') : 'opacity-40 hover:opacity-100'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Theme Switcher */}
          <div className={`flex items-center gap-2 p-1 border-4 ${isNeon ? 'neon-border-pink' : isLight ? 'border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)]' : 'border-current shadow-[4px_4px_0px_currentColor]'}`}>
            <button 
              onClick={() => setTheme(ThemeMode.LIGHT)}
              className={`p-2 transition-all ${isLight ? 'bg-slate-900 text-white' : 'opacity-40 hover:opacity-100'}`}
            >
              <Sun size={18} />
            </button>
            <button 
              onClick={() => setTheme(ThemeMode.DARK)}
              className={`p-2 transition-all ${theme === ThemeMode.DARK ? 'bg-slate-100 text-slate-950' : 'opacity-40 hover:opacity-100'}`}
            >
              <Moon size={18} />
            </button>
            <button 
              onClick={() => setTheme(ThemeMode.NEON)}
              className={`p-2 transition-all ${isNeon ? 'bg-pink-600 shadow-[0_0_15px_#ff00ff] text-white' : 'opacity-40 hover:opacity-100'}`}
            >
              <Zap size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-5 space-y-12">
            <div className={`p-10 border-4 transition-all ${
              isNeon ? 'neon-border-pink bg-black shadow-[8px_8px_0px_#ff00ff]' : 
              isLight ? 'border-slate-900 bg-white shadow-[10px_10px_0px_rgba(15,23,42,1)]' : 
              'border-current shadow-[10px_10px_0px_currentColor]'
            }`}>
              <div className="flex items-center gap-3 mb-8">
                <Terminal size={24} className={isNeon ? 'neon-text-pink' : isLight ? 'text-slate-900' : ''} />
                <h2 className={`font-bold uppercase text-[12px] font-pixel tracking-tighter ${isLight ? 'text-slate-900' : ''}`}>{t.terminal}</h2>
              </div>
              
              <div className={`font-pixel text-[10px] space-y-3 opacity-80 mb-6 uppercase tracking-tighter ${isLight ? 'text-slate-800 font-bold' : ''}`}>
                <div className="flex justify-between border-b-2 border-current/10 pb-2">
                  <span>{t.node}:</span>
                  <span className={isNeon ? 'neon-text-pink' : ''}>{conn.endpoint}</span>
                </div>
                <div className="flex justify-between border-b-2 border-current/10 pb-2">
                  <span>{t.port}:</span>
                  <span className={isNeon ? 'neon-text-pink' : ''}>{conn.port}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>{t.link}:</span>
                  <span className={`${isLight ? 'text-emerald-700' : 'text-emerald-500'} animate-pulse font-bold`}>{t.established}</span>
                </div>
              </div>

              {/* API DATA TYPES SECTION */}
              <div className={`mb-10 p-4 border-2 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'}`}>
                <h3 className={`text-[10px] font-pixel mb-4 flex items-center gap-2 ${isLight ? 'text-slate-600' : 'opacity-60'}`}>
                  <Layers size={14} /> {t.dataTypes}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {dataTypes.map((dt) => (
                    <div key={dt.name} className="flex items-center gap-3">
                      <dt.icon size={14} className={isNeon ? 'neon-text-cyan' : isLight ? 'text-slate-900' : ''} />
                      <span className={`text-[9px] font-pixel uppercase ${isLight ? 'text-slate-800' : 'opacity-80'}`}>{dt.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Input text for analysis..."
                  className={`w-full h-56 p-8 border-4 transition-all outline-none resize-none font-pixel text-[12px] leading-relaxed ${
                    isNeon ? 'bg-black border-pink-500/30 focus:border-pink-500 text-pink-50' : 
                    isLight ? 'bg-slate-50 border-slate-900 focus:bg-white text-slate-900' : 
                    'bg-white dark:bg-slate-900 border-current focus:bg-slate-50 dark:focus:bg-slate-800'
                  }`}
                />
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !inputText.trim()}
                className={`w-full mt-10 py-6 font-bold uppercase flex items-center justify-center gap-4 transition-all font-pixel text-[14px] ${
                  isAnalyzing ? 'opacity-50 cursor-not-allowed' : 
                  isNeon ? 'bg-pink-600 hover:bg-pink-500 shadow-[0_0_25px_#ff00ff]' : 
                  isLight ? 'bg-slate-900 text-white hover:bg-slate-800 hover:translate-y-[-4px]' :
                  'bg-current text-slate-900 dark:text-slate-900 hover:translate-y-[-4px] active:translate-y-0'
                }`}
              >
                {isAnalyzing ? t.waiting : (
                  <>
                    {t.execute} <Send size={20} />
                  </>
                )}
              </button>
            </div>

            <div className={`p-8 border-4 ${isNeon ? 'neon-border-cyan bg-black' : isLight ? 'border-slate-900 bg-white/50' : 'border-dashed border-current opacity-60'}`}>
              <div className="flex items-center gap-3 mb-4 font-pixel">
                <Database size={20} className={isLight ? 'text-slate-900' : ''} />
                <h3 className={`text-[10px] font-bold uppercase ${isLight ? 'text-slate-900' : ''}`}>{t.enterprise}</h3>
              </div>
              <p className={`text-[11px] leading-relaxed font-pixel opacity-70 ${isLight ? 'text-slate-800 font-medium' : ''}`}>
                {t.enterpriseText}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-start">
            {result ? (
              <div className="w-full space-y-16 animate-in fade-in slide-in-from-right-8 duration-700">
                <SentimentDisplay 
                  result={result} 
                  theme={theme}
                />
                
                <Suspense fallback={<div className="w-full h-96 flex items-center justify-center font-pixel opacity-50">LOADING_ANALYTICS...</div>}>
                  <AnalyticsCharts data={result} theme={theme} />
                </Suspense>

                <div className={`mt-16 p-10 border-4 text-center space-y-8 ${
                  isNeon ? 'neon-border-cyan bg-black shadow-[8px_8px_0px_#00ffff]' : 
                  isLight ? 'border-slate-900 bg-white shadow-[10px_10px_0px_rgba(15,23,42,1)]' :
                  'border-current shadow-[10px_10px_0px_currentColor]'
                }`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 border-4 ${isLight ? 'border-slate-900' : 'border-current'} mb-2`}>
                    <ArrowDown className="animate-bounce" size={24} />
                  </div>
                  <h3 className={`text-[14px] font-bold uppercase font-pixel tracking-widest ${isLight ? 'text-slate-900' : ''}`}>{t.outputFormats}</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { label: 'JSON', icon: FileJson },
                      { label: 'CSV', icon: FileText },
                      { label: 'XML', icon: FileCode },
                      { label: 'AVRO', icon: Database },
                      { label: 'PB', icon: Database },
                    ].map((fmt) => (
                      <button key={fmt.label} className={`py-4 border-4 transition-all flex flex-col items-center gap-2 hover:scale-110 font-pixel ${
                        isNeon ? 'border-cyan-500/50 hover:border-cyan-500 text-cyan-400' : 
                        isLight ? 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white' :
                        'border-current hover:bg-current hover:text-slate-900'
                      }`}>
                        <fmt.icon size={18} />
                        <span className="text-[10px] font-bold">{fmt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[600px] text-center opacity-30">
                <div className={`w-24 h-24 border-8 border-current border-t-transparent animate-spin mb-10 ${isLight ? 'border-slate-900 border-t-transparent' : ''}`} />
                <h3 className={`text-3xl font-bold uppercase tracking-[0.3em] mb-4 font-pixel ${isLight ? 'text-slate-900' : ''}`}>{t.idleTitle}</h3>
                <p className={`text-[14px] font-pixel leading-tight ${isLight ? 'text-slate-800' : ''}`}>{t.idleSub}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className={`py-16 border-t-8 ${isLight ? 'border-slate-200 bg-white' : 'border-current/10'} container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-pixel uppercase`}>
        <p className={isLight ? 'text-slate-600' : 'opacity-50'}>© 2024 EMOJIGRAPH_V4.5_CLI. CORE: SPRING_BOOT // DATA: PYTHON_ML.</p>
        <div className={`flex gap-12 ${isLight ? 'text-slate-700' : 'opacity-50'}`}>
          <a href="#" className="hover:opacity-100 hover:underline transition-all">DOCUMENTATION</a>
          <a href="#" className="hover:opacity-100 hover:underline transition-all">API_GATEWAY</a>
          <a href="#" className="hover:opacity-100 hover:underline transition-all">OSS_LICENSE</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
