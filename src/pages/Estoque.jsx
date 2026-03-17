import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, GlassWater, Wine, Beer, Milk, Package, Martini, Droplet } from 'lucide-react';
import { useState, useEffect } from 'react';
import initialStockData from '../data/estoque.json';

let currentStockData = initialStockData;
let updateListeners = [];

if (import.meta.hot) {
    import.meta.hot.accept('../data/estoque.json', (newModule) => {
        if (newModule) {
            currentStockData = newModule.default;
            updateListeners.forEach(listener => listener([...currentStockData]));
        }
    });
}

// Map types to Lucide icons
const iconMap = {
    energetico: <Zap size={48} className="text-brand-green" />,
    refrigerante: <GlassWater size={48} className="text-blue-400" />,
    vodka: <Wine size={48} className="text-indigo-400" />,
    corote: <Milk size={48} className="text-pink-400" />,
    cerveja: <Beer size={48} className="text-amber-500" />,
    cachaca: <Martini size={48} className="text-teal-500" />,
    suco: <Package size={48} className="text-orange-400" />,
    xarope: <Droplet size={48} className="text-red-500" />
};

const InventoryCard = ({ item, index }) => {
    const isCritical = item.quantity < 10; // Mock threshold
    const progress = Math.min((item.quantity / 50) * 100, 100); // Mock max of 50 for bar

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300"
        >
            {/* Status Badge */}


            {/* Icon Circle */}
            <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-green/10 transition-colors duration-300">
                {iconMap[item.type] || <Package size={48} className="text-gray-400" />}
            </div>

            {/* Content */}
            <div className="text-center">
                <h3 className="font-varsity text-2xl text-gray-800 tracking-wide mb-1">{item.name}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase font-montserrat mb-4">Unidade</p>

                {/* Quantity & Progress */}
                <div className="bg-gray-100 h-2 rounded-full overflow-hidden relative mb-2">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`absolute left-0 top-0 bottom-0 rounded-full ${isCritical ? 'bg-red-500' : 'bg-brand-green'}`}
                    />
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                    <span>Qtd</span>
                    <span className="text-gray-800 text-lg">{item.quantity}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default function Estoque() {
    const [stockData, setStockData] = useState(currentStockData);

    useEffect(() => {
        const listener = (newData) => setStockData(newData);
        updateListeners.push(listener);
        return () => {
            updateListeners = updateListeners.filter(l => l !== listener);
        };
    }, []);

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-8 pb-20">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-4 transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        <span className="font-montserrat font-bold">Voltar</span>
                    </Link>
                    <h1 className="text-4xl font-varsity text-brand-green tracking-wider mb-2">Controle de Estoque</h1>
                    <p className="text-gray-500 font-montserrat">Gerencie os itens da atlética</p>
                </div>


            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {stockData.map((item, index) => (
                    <InventoryCard key={item.id} item={item} index={index} />
                ))}
            </div>

        </div>
    );
}
