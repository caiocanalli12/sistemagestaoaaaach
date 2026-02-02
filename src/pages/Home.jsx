import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Eye, EyeOff, Minus } from 'lucide-react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CalendarWidget from '../components/CalendarWidget';

// Mock Data for the chart
const data = [
    { name: 'Fev', lucros: 0, gastos: 0 },
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
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-4"
            >
                <h1 className="text-3xl font-montserrat font-bold text-gray-800">
                    Painel Geral
                </h1>
                <p className="text-gray-500 font-medium">Balanço e Visão Geral da Atlética</p>
            </motion.div>

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
                                    <linearGradient id="colorLucros" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#54e600" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#54e600" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                {isVisible && (
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                    />
                                )}
                                <Area type="monotone" dataKey="lucros" stroke="#54e600" strokeWidth={3} fillOpacity={1} fill="url(#colorLucros)" />
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

                {/* Calendar Section - Spans 12 cols */}
                <div className="md:col-span-12">
                    <CalendarWidget />
                </div>
            </div>
        </div>
    );
}
