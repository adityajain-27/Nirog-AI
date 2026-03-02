import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
    Activity, Brain, Shield, HeartPulse, ArrowRight,
    Stethoscope, FileText, Pill, MessageSquare, Camera,
    BarChart3, Mail, CreditCard, Zap, Users
} from 'lucide-react';

export default function AboutPage() {
    const patientFeatures = [
        {
            icon: Brain,
            title: 'AI Triage',
            description: 'Get instantly classified as 🔴 Emergency, 🟡 Urgent, or 🟢 Non-urgent based on your symptoms — before you even see a doctor.',
        },
        {
            icon: FileText,
            title: 'SOAP Notes',
            description: 'A full clinical note (Subjective, Objective, Assessment, Plan) is generated automatically from your symptom input.',
        },
        {
            icon: Pill,
            title: 'Drug Interaction Check',
            description: 'Cross-references your current medications against OpenFDA data to flag potential interactions with proposed treatments.',
        },
        {
            icon: MessageSquare,
            title: 'Follow-up Questions',
            description: 'The AI asks OPQRST-guided clinical questions to refine the diagnosis — not generic, but context-aware to your exact symptoms.',
        },
        {
            icon: Camera,
            title: 'Image Analysis',
            description: 'Upload photos of rashes, wounds, or skin conditions. Our vision model analyzes them alongside your symptoms for a more complete picture.',
        },
        {
            icon: Activity,
            title: 'Differential Diagnosis',
            description: 'Get a ranked list of possible conditions with ICD-10 codes and clinical reasoning, powered by our RAG pipeline over medical literature.',
        },
    ];

    const doctorFeatures = [
        {
            icon: Users,
            title: 'Patient Management',
            description: 'Maintain a full patient roster with medical history, allergies, medications, blood group, and demographic data.',
        },
        {
            icon: Mail,
            title: 'Email Intake Forms',
            description: 'Send a branded intake link to any patient by email. When they fill it in, the AI report is automatically generated and appears on your dashboard.',
        },
        {
            icon: Stethoscope,
            title: 'One-Click Analysis',
            description: 'Run a full AI assessment for any patient directly from the dashboard — with their context automatically included.',
        },
        {
            icon: BarChart3,
            title: 'Analytics Dashboard',
            description: 'Track triage breakdowns (RED/YELLOW/GREEN), top conditions, average urgency scores, and weekly assessment trends across all your patients.',
        },
        {
            icon: FileText,
            title: 'Assessment History',
            description: 'Every AI report is stored and linked to the patient. Review the full timeline of assessments, SOAP notes, and drug interaction flags anytime.',
        },
        {
            icon: CreditCard,
            title: 'Credit-Based Usage',
            description: 'Flexible credit packages (Starter, Standard, Pro) — pay only for what you use with Razorpay-powered secure checkout.',
        },
    ];

    const pipeline = [
        { step: '01', label: 'RAG Agent', desc: 'Retrieves relevant clinical guidelines from a medical knowledge base' },
        { step: '02', label: 'Triage Agent', desc: 'Classifies urgency as RED / YELLOW / GREEN using rules + LLM' },
        { step: '03', label: 'Vision Agent', desc: 'Analyzes uploaded images (skin, wounds, eyes) with a vision model' },
        { step: '04', label: 'Follow-Up Agent', desc: 'Generates OPQRST-guided follow-up questions for clinical depth' },
        { step: '05', label: 'Assessment Agent', desc: 'Synthesizes everything into a SOAP note + differential diagnosis' },
        { step: '06', label: 'Drug Agent', desc: 'Checks OpenFDA for interactions and flags severity levels' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <header className="fixed w-full z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/">
                        <img src="/nirog-logo.png" alt="Nirog Ai" className="h-10 w-auto object-contain" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/contact" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                            Contact
                        </Link>
                        <Link to="/login">
                            <Button variant="ghost" size="sm">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button size="sm" className="bg-teal-600 hover:bg-teal-700">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-sm font-medium px-4 py-1.5 rounded-full border border-teal-200 dark:border-teal-800 mb-6">
                        <Zap className="w-3.5 h-3.5" /> AI-Powered Clinical Triage Platform
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                        What is <span className="text-teal-600">Nirog AI?</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-6 leading-relaxed">
                        Nirog AI is a dual-sided clinical platform — built for both <strong className="text-slate-800 dark:text-slate-200">patients</strong> who need instant health guidance and <strong className="text-slate-800 dark:text-slate-200">doctors</strong> who want to manage patients more efficiently with AI.
                    </p>
                    <p className="text-base text-slate-500 dark:text-slate-500 max-w-2xl mx-auto mb-10">
                        Under the hood, a 6-agent AI pipeline — powered by Groq's Llama 3.3 and a RAG system over medical literature — analyzes symptoms, checks drug interactions, generates SOAP notes, and classifies urgency in seconds.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link to="/register">
                            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                                Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button size="lg" variant="outline">Contact Us</Button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Patient Features */}
            <section className="py-20 px-6 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-teal-600 font-semibold text-sm uppercase tracking-widest mb-2">For Patients</p>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Know your urgency before you wait</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Describe your symptoms, get a clinical-grade AI assessment in seconds — no appointment needed.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {patientFeatures.map((f, idx) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                            >
                                <Card className="h-full border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="w-11 h-11 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-xl flex items-center justify-center mb-4">
                                            <f.icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Doctor Features */}
            <section className="py-20 px-6 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">For Doctors</p>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">A personalised clinical dashboard</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Manage your entire patient panel, run AI assessments, and receive intake reports automatically — all in one place.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctorFeatures.map((f, idx) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                            >
                                <Card className="h-full border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="w-11 h-11 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4">
                                            <f.icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Pipeline */}
            <section className="py-20 px-6 bg-white dark:bg-slate-900">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">Under the Hood</p>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">6-Agent AI Pipeline</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Every assessment runs through a sequential multi-agent system — each agent specialised for its role.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {pipeline.map((p, idx) => (
                            <motion.div
                                key={p.step}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-4 items-start p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                            >
                                <span className="text-2xl font-black text-slate-200 dark:text-slate-700 leading-none mt-0.5">{p.step}</span>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{p.label}</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">{p.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values strip */}
            <section className="py-16 px-6 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    {[
                        { icon: Shield, label: 'Secure & Private', desc: 'JWT auth, role-based access, and bcrypt-hashed credentials.' },
                        { icon: Brain, label: 'RAG-Powered', desc: 'Grounded in medical literature — not hallucinating from thin air.' },
                        { icon: HeartPulse, label: 'Patient-Centric', desc: 'Plain-language outputs built for people, not just clinicians.' },
                        { icon: Zap, label: 'Built in 24 Hours', desc: 'Hackathon-born, production-quality code. Open source on GitHub.' },
                    ].map((v, idx) => (
                        <motion.div
                            key={v.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6"
                        >
                            <div className="w-12 h-12 mx-auto bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 rounded-xl flex items-center justify-center mb-4">
                                <v.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{v.label}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center bg-white dark:bg-slate-900">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Ready to try it?</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg">
                        Sign up as a patient to get a free assessment, or as a doctor to manage your patient panel with AI.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link to="/register">
                            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                                Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <a href="https://github.com/adityajain-27/Nirog-AI" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" variant="outline">View on GitHub</Button>
                        </a>
                    </div>
                </div>
            </section>

            <footer className="border-t border-slate-200 dark:border-slate-800 py-10 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} Nirog AI. For research and educational purposes. Not a substitute for professional medical advice.</p>
                </div>
            </footer>
        </div>
    );
}
