import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Eye, EyeOff, Minus } from 'lucide-react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CalendarWidget from '../components/CalendarWidget';

// Mock Data for the chart
const data = [
    { name: 'Jan', saldo: 5411.79 },
    { name: 'Fev', saldo: 5321.07 },
];

const GlassCard = ({ children, className, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={`bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl p-6 relative overflow-hidden ${className}`}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
        <div className="relative z-10 h-full">{children}</div>
    </motion.div>
);

const AnimatedNumber = ({ value, isVisible }) => (
    <span className="font-varsity text-5xl md:text-6xl text-gray-800 tracking-wider">
        {isVisible ? value : '••••••'}
    </span>
);

export default function Home() {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            {/* ... (Welcome Section omitted, keeping context) */}

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

                {/* Main Balance Card - Spans 8 cols */}
                <GlassCard className="md:col-span-8 flex flex-col justify-between" delay={0.1}>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest font-montserrat">Saldo Atual</h2>
                                <button
                                    onClick={toggleVisibility}
                                    className="text-gray-400 hover:text-brand-green transition-colors focus:outline-none"
                                    title={isVisible ? "Ocultar valores" : "Mostrar valores"}
                                >
                                    {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-varsity text-4xl text-gray-400">R$</span>
                                <AnimatedNumber value="5.321,07" isVisible={isVisible} />
                            </div>
                        </div>
                        <div className="p-3 bg-brand-green/20 rounded-full text-brand-green">
                            <DollarSign size={24} />
                        </div>
                    </div>

                    <div className="h-64 mt-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#54e600" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#54e600" stopOpacity={0} />
                                    </linearGradient>
                                    <filter id="shadow" height="200%">
                                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#54e600" floodOpacity="0.3" />
                                    </filter>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 600, fontFamily: 'Montserrat' }}
                                    dy={10}
                                />
                                {isVisible && (
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ color: '#1f2937', fontWeight: 'bold' }}
                                        formatter={(value) => [`R$ ${value}`, 'Saldo']}
                                    />
                                )}
                                <Area
                                    type="monotone"
                                    dataKey="saldo"
                                    stroke="#54e600"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorSaldo)"
                                    activeDot={{ r: 8, strokeWidth: 0, fill: '#16a34a' }}
                                    style={{ filter: 'url(#shadow)' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Quick Stats Column - Spans 4 cols */}
                <div className="md:col-span-4 flex flex-col gap-6">

                    {/* Lucros Card */}
                    <GlassCard className="flex-1" delay={0.2}>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-2xl text-green-600">
                                <ArrowUpRight size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase font-montserrat">Lucros Última Festa</p>
                                <p className="text-2xl font-varsity text-gray-800">
                                    {isVisible ? 'R$ 0,00' : '•••••'}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit">
                            <Minus size={14} />
                            <span>0% vs mês anterior</span>
                        </div>
                    </GlassCard>

                    {/* Gastos Card */}
                    <GlassCard className="flex-1" delay={0.3}>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-100 rounded-2xl text-red-500">
                                <ArrowDownRight size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase font-montserrat">Gastos Última Movimentação</p>
                                <p className="text-2xl font-varsity text-gray-800">
                                    {isVisible ? 'R$ 100,00' : '•••••'}
                                </p>
                            </div>
                        </div>
                        <Link to="/semaforo-festa" className="mt-4 flex items-center gap-2 text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full w-fit hover:bg-red-100 transition-colors cursor-pointer">
                            <span>Sinal Chácara</span>
                            <ArrowUpRight size={14} className="rotate-45" />
                        </Link>
                    </GlassCard>

                </div>

                {/* Investment Observation - Spans 12 cols */}
                <GlassCard className="md:col-span-12 py-4" delay={0.4}>
                    <div className="flex items-center gap-5">
                        <div className="p-3 bg-blue-100/80 rounded-2xl text-blue-600 shrink-0 shadow-sm">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase font-montserrat mb-1">Rendimento Automático</h3>
                            <p className="text-gray-600 font-medium font-montserrat text-sm md:text-base leading-relaxed">
                                O saldo possui rendimento de <span className="text-blue-600 font-bold">100% do CDI diário</span>.
                                A valorização compensa parte dos gastos, mantendo o saldo sempre atualizado.
                            </p>
                        </div>
                    </div>
                </GlassCard>

                {/* Calendar Section - Spans 12 cols */}
                <div className="md:col-span-12">
                    <CalendarWidget />
                </div>
            </div>
        </div>
    );
}
