import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Brain, 
  Globe, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import './App.css';

const useScrollAnimation = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );
    
    observer.observe(element);
    
    return () => observer.unobserve(element);
  }, []);
  
  return elementRef;
};

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features 
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
}) => {
  const ref = useScrollAnimation();
  
  return (
    <div ref={ref} className="opacity-0 translate-y-8">
      <Card className="group h-full bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm">
        <CardHeader>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-slate-400 leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 transition-colors"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ContactForm = () => {
  const ref = useScrollAnimation();
  
  return (
    <div ref={ref} className="opacity-0 translate-y-8">
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-blue-500" />
            Conectemos
          </CardTitle>
          <CardDescription className="text-slate-400">
            ¿Listo para transformar tu negocio? Ponte en contacto con nuestro equipo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input 
                placeholder="Tu Nombre" 
                className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
              />
            </div>
            <div>
              <Input 
                type="email"
                placeholder="Tu Email" 
                className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <Input 
              placeholder="Asunto" 
              className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
            />
          </div>
          <div>
            <Textarea 
              placeholder="Cuéntanos sobre tu proyecto..."
              rows={4}
              className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 resize-none"
            />
          </div>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
            Enviar Mensaje
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

function App() {
  const heroRef = useScrollAnimation();
  const servicesRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  const services = [
    {
      icon: Briefcase,
      title: "Consultoría Empresarial",
      description: "Orientación estratégica para optimizar tus operaciones y acelerar el crecimiento con insights basados en datos.",
      features: ["Planificación Estratégica", "Optimización de Procesos", "Análisis de Mercado", "Mejora del ROI"]
    },
    {
      icon: Code,
      title: "Desarrollo Web",
      description: "Soluciones web de vanguardia construidas con tecnologías modernas para experiencias de usuario excepcionales.",
      features: ["React/Next.js", "Full-Stack", "Mobile-First", "Optimizado para Rendimiento"]
    },
    {
      icon: Globe,
      title: "Servicios de Importación",
      description: "Soluciones de importación optimizadas con experiencia en logística global y gestión de cumplimiento.",
      features: ["Cadena de Suministro", "Despacho Aduanero", "Control de Calidad", "Gestión de Riesgos"]
    },
    {
      icon: Brain,
      title: "Soluciones de IA",
      description: "Automatización inteligente y soluciones de aprendizaje automático para revolucionar tus procesos empresariales.",
      features: ["Aprendizaje Automático", "Automatización de Procesos", "Análisis de Datos", "Modelos de IA Personalizados"]
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div ref={heroRef} className="text-center max-w-4xl mx-auto opacity-0 translate-y-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              zsh
            </span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-400">
              Innovación a Escala
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Ofrecemos soluciones integrales en consultoría, desarrollo web, 
            importación y servicios de IA para acelerar el crecimiento de tu negocio.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="max-w-7xl mx-auto">
          <div ref={servicesRef} className="text-center mb-16 opacity-0 translate-y-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Nuestros <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Servicios</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Soluciones integrales diseñadas para impulsar tu negocio en la era digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="max-w-4xl mx-auto">
          <div ref={contactRef} className="text-center mb-16 opacity-0 translate-y-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              ¿Listo para <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Comenzar?</span>
            </h2>
            <p className="text-xl text-slate-400">
              Conversemos sobre cómo podemos ayudar a transformar tu negocio
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">zsh</span>
          </div>
          <p className="text-slate-400 mb-4">
            Potenciando negocios a través de soluciones tecnológicas innovadoras
          </p>
          <p className="text-sm text-slate-500">
            © 2025 zsh SpA. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;