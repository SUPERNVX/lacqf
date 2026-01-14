'use client';

import React, { useState } from 'react';
import {
    Rocket,
    Atom,
    GraduationCap,
    Users,
    ChevronDown,
    UserPlus,
    Youtube,
    BookOpen
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SignupForm from './SignupForm';

const MembershipSection = ({ id }) => {
    const [openIdx, setOpenIdx] = useState(0);
    const { t } = useLanguage();

    // Get base path for GitHub Pages compatibility
    const basePath = process.env.BASE_PATH || '';

    const motivos = [
        {
            icon: <Rocket className="w-6 h-6 text-primary-500" />,
            titulo: t('pioneerTitle'),
            texto: t('pioneerText'),
        },
        {
            icon: <Atom className="w-6 h-6 text-primary-500" />,
            titulo: t('researchTitle'),
            texto: t('researchText'),
        },
        {
            icon: <GraduationCap className="w-6 h-6 text-primary-500" />,
            titulo: t('educationTitle'),
            texto: t('educationText'),
        },
        {
            icon: <Users className="w-6 h-6 text-primary-500" />,
            titulo: t('networkingTitle'),
            texto: t('networkingText'),
        },
    ];

    const resources = [
        {
            title: "YouTube",
            icon: <Youtube className="w-5 h-5" />,
            link: "https://www.youtube.com/@lacq_feynman",
            color: "red"
        },
        {
            title: "Mentores",
            icon: <Users className="w-5 h-5" />,
            link: "https://shorturl.at/p5Oti",
            color: "indigo"
        },
        {
            title: "Materiais",
            icon: <BookOpen className="w-5 h-5" />,
            link: "https://shorturl.at/BVmTs",
            color: "purple"
        }
    ];

    return (
        <section
            id={id}
            className="py-20 px-4 sm:px-6 lg:px-8 relative section-gradient-bg overflow-hidden"
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header da Seção */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-title font-bold mb-4">
                        <span className="text-primary">{t('joinCommunityTitle').split(' ')[0]}</span> {t('joinCommunityTitle').substring(t('joinCommunityTitle').indexOf(' ') + 1)}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('joinCommunitySubtitle')}
                    </p>
                </div>

                {/* Main Content: Split Layout (Reasons + Signup) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">

                    {/* Left Column: Why Join (Accordion) */}
                    <div className="space-y-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-title font-semibold mb-2 flex items-center gap-2">
                                <Rocket className="w-6 h-6 text-primary" />
                                {t('whyLACQFTitle')}
                            </h3>
                            <p className="text-muted-foreground">
                                {t('whyLACQFSubtitle')}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {motivos.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`border rounded-xl overflow-hidden transition-all duration-300 ${openIdx === idx ? 'bg-surface border-primary/30 shadow-md' : 'bg-surface/50 border-border/50 hover:bg-surface'
                                        }`}
                                >
                                    <button
                                        className="w-full flex items-center justify-between gap-4 px-6 py-4 focus:outline-none"
                                        onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                                    >
                                        <div className="flex items-center gap-4 text-left">
                                            <div className={`p-2 rounded-lg transition-colors ${openIdx === idx ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                {item.icon}
                                            </div>
                                            <span className={`text-base font-semibold ${openIdx === idx ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                {item.titulo}
                                            </span>
                                        </div>
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform duration-300 ${openIdx === idx ? 'rotate-180 text-primary' : 'text-muted-foreground'}`}
                                        />
                                    </button>
                                    <div
                                        className={`transition-all duration-300 ease-in-out ${openIdx === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="px-6 pb-5 pt-0 text-muted-foreground text-sm leading-relaxed pl-[4.5rem]">
                                            {item.texto}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Signup Form */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-20"></div>
                        <div className="relative bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-xl">
                            <SignupForm />
                        </div>
                    </div>
                </div>

                {/* Footer Strip: Resources (Discover More) */}
                <div className="border-t border-border pt-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Logo + Text Section - Left */}
                        <div className="flex items-center gap-4 md:gap-6">
                            <img
                                src={`${basePath}/images/lacqf/logo completa.webp`}
                                alt="LACQ Feynman Logo Completa"
                                className="h-12 w-auto object-contain"
                            />
                            <div className="text-left">
                                <h4 className="text-xl font-title font-semibold mb-1">{t('exploreMoreTitle')}</h4>
                                <p className="text-sm text-muted-foreground">{t('exploreMoreSubtitle')}</p>
                            </div>
                        </div>

                        {/* Resources Section - Right */}
                        <div className="flex gap-4">
                            {resources.map((res, idx) => {
                                const colorClasses = {
                                    red: "bg-red-500/10 text-red-500 hover:shadow-red-500/5",
                                    indigo: "bg-indigo-500/10 text-indigo-500 hover:shadow-indigo-500/5",
                                    purple: "bg-purple-500/10 text-purple-500 hover:shadow-purple-500/5"
                                };
                                const activeColorClass = colorClasses[res.color];

                                return (
                                    <a
                                        key={idx}
                                        href={res.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group flex items-center gap-3 px-5 py-3 rounded-xl bg-surface border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 ${activeColorClass.replace('bg-', 'hover:shadow-')}`}
                                    >
                                        <div className={`p-2 rounded-lg group-hover:scale-110 transition-transform ${activeColorClass.split(' ').slice(0, 2).join(' ')}`}>
                                            {res.icon}
                                        </div>
                                        <span className="font-medium text-sm group-hover:text-foreground text-muted-foreground transition-colors">
                                            {res.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MembershipSection;
