import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const CalendarWidget = () => {
    const [date, setDate] = useState(new Date());
    const [currYear, setCurrYear] = useState(date.getFullYear());
    const [currMonth, setCurrMonth] = useState(date.getMonth());

    const months = [
        "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
        "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
    ];

    const events = [
        { day: 11, month: 2, label: 'Semáforo' }, // March is month 2
        { day: 12, month: 2, label: 'Calourada' }
    ];

    const prevMonth = () => {
        if (currYear === 2026 && currMonth === 0) return; // Prevent before Jan 2026
        if (currMonth === 0) {
            setCurrMonth(11);
            setCurrYear(currYear - 1);
        } else {
            setCurrMonth(currMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currYear === 2026 && currMonth === 11) return; // Prevent after Dec 2026
        if (currMonth === 11) {
            setCurrMonth(0);
            setCurrYear(currYear + 1);
        } else {
            setCurrMonth(currMonth + 1);
        }
    };

    const generateCalendar = () => {
        const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
        const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
        const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
        const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

        let days = [];

        // Previous month's days
        for (let i = firstDayOfMonth; i > 0; i--) {
            days.push({
                day: lastDateOfLastMonth - i + 1,
                active: false,
                faded: true,
                event: null
            });
        }

        // Current month's days
        for (let i = 1; i <= lastDateOfMonth; i++) {
            const isToday =
                i === new Date().getDate() &&
                currMonth === new Date().getMonth() &&
                currYear === new Date().getFullYear();

            const event = events.find(e => e.day === i && e.month === currMonth);

            days.push({
                day: i,
                active: isToday,
                faded: false,
                event: event
            });
        }

        // Next month's days
        for (let i = lastDayOfMonth; i < 6; i++) {
            days.push({
                day: i - lastDayOfMonth + 1,
                active: false,
                faded: true,
                event: null
            });
        }

        return days;
    };

    const days = generateCalendar();

    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleDayClick = (event) => {
        setSelectedEvent(event);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl p-6 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

            <div className="relative z-10 w-full">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-varsity text-brand-green tracking-wider uppercase">
                            {months[currMonth]}
                        </h2>
                        <p className="text-gray-400 font-montserrat font-bold text-lg">
                            {currYear}
                        </p>
                    </div>
                    {/* Navigation Controls */}
                    <div className="flex gap-2">
                        <button
                            onClick={prevMonth}
                            disabled={currYear === 2026 && currMonth === 0}
                            className="p-2 bg-white/50 hover:bg-white text-brand-green rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextMonth}
                            disabled={currYear === 2026 && currMonth === 11}
                            className="p-2 bg-white/50 hover:bg-white text-brand-green rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Days of Week */}
                <div className="grid grid-cols-7 mb-4">
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                        <div key={i} className="text-center font-montserrat font-bold text-gray-400 text-sm">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1">
                    {days.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleDayClick(item.event)}
                            title={item.event ? item.event.label : ''}
                            className={`
                                aspect-square flex flex-col items-center justify-center rounded-xl font-bold font-montserrat transition-all duration-300 relative group p-1
                                ${item.active
                                    ? 'bg-brand-green text-white shadow-lg shadow-brand-green/30 scale-110 z-10'
                                    : item.faded
                                        ? 'text-gray-300'
                                        : item.event
                                            ? 'bg-orange-100 text-orange-600 hover:bg-orange-200 cursor-pointer'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-brand-green cursor-pointer'
                                }
                            `}
                        >
                            <span className="text-lg leading-none">{item.day}</span>

                            {/* Desktop Event Label */}
                            {item.event && (
                                <span className="hidden md:block text-[10px] uppercase font-bold mt-1 text-center leading-tight">
                                    {item.event.label}
                                </span>
                            )}

                            {/* Mobile Event Dot */}
                            {item.event && !item.active && (
                                <div className="md:hidden mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Selected Event Box */}
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between"
                    >
                        <div>
                            <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">Evento</p>
                            <p className="text-lg font-varsity text-orange-600">{selectedEvent.label}</p>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedEvent(null); }}
                            className="p-2 text-orange-400 hover:bg-orange-100 rounded-full transition-colors"
                        >
                            <ChevronLeft className="rotate-[-90deg]" size={16} />
                        </button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default CalendarWidget;