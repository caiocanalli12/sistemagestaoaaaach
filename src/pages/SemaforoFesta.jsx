import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FolderOpen, Image, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import chacaraReceipt from '../comprovantes/chacara_sinal_calourada.png';

function SemaforoFesta() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-8 pb-20 relative">
            {/* Header Section */}
            <div>
                <Link to="/prestacao-contas" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-4 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    <span className="font-montserrat font-bold">Voltar</span>
                </Link>
                <h1 className="text-4xl font-varsity text-brand-green tracking-wider mb-2">SEMAFORO E FESTA</h1>
                <p className="text-gray-500 font-montserrat">Detalhes do evento</p>
            </div>

            {/* Folders/Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Chacara Folder */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-gray-800 font-bold font-montserrat mb-4 flex items-center gap-2">
                        <FolderOpen className="text-brand-green" /> CHÁCARA
                    </h2>

                    <div className="space-y-2">
                        <button
                            onClick={() => setSelectedImage(chacaraReceipt)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer text-left"
                        >
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500 group-hover:scale-105 transition-transform">
                                <Image size={20} />
                            </div>
                            <span className="text-sm text-gray-600 font-medium font-montserrat">chacara_sinal_calourada.png</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Preview Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2"
                            onClick={(e) => e.stopPropagation()} // Prevent close on image click
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                            >
                                <X size={24} />
                            </button>
                            <img
                                src={selectedImage}
                                alt="Visualização do comprovante"
                                className="w-full h-full object-contain max-h-[85vh] rounded-xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default SemaforoFesta;
