import React, { useState, useEffect, useRef } from 'react';

// Define los colores personalizados de Tailwind CSS
const tailwindConfig = `
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          'green-mint': '#A8E6CF', // Verde menta: Fondo suave y botones (para hover sutil)
          'green-leaf': '#56C596', // Verde hoja: Elementos activos/destacados y color principal de botones
          'green-leaf-dark': '#4CAF80', // Un tono más oscuro para el hover de los botones verdes
          'white': '#FFFFFF', // Blanco: Fondos, limpieza visual
          'gray-light': '#B0BEC5', // Gris claro: Texto secundario, íconos
          'brown-earth': '#8D6E63', // Marrón tierra: Para toques naturales
          'blue-soft': '#81D4FA', // Azul suave: Datos o tecnología
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'], // Usamos Poppins como fuente principal
        }
      }
    }
  }
`;

// Iconos de Lucide React (simulados para el entorno de Canvas)
// En un entorno React real, importarías estos desde 'lucide-react'
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const SproutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M12 15V4"/><path d="M17 11c-2.71 1.7-5.33 1.7-8 0"/><path d="M12 4l-3 3"/><path d="M12 4l3 3"/></svg>;
const DropIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0z"/></svg>;
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2 0 0 1 0-5H20"/><polyline points="10 2 10 12 15 7 15 17"/></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const MessageSquareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M15 7l-6 6"/></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 5a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1zm4 0a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1zm-4 8a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-1a2 2 0 = 0 1 2-2h1zm4 0a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h1z"/></svg>;


// Componente para la pantalla de Inicio / Dashboard
const DashboardScreen = () => (
  <div className="p-6 text-center">
    <h2 className="text-3xl font-bold text-green-leaf mb-4">¡Bienvenido a Greeni!</h2>
    <p className="text-gray-light mb-8">Un vistazo rápido al estado de tus plantas.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
        <h3 className="text-xl font-semibold text-green-leaf mb-2">Humedad</h3>
        <p className="text-4xl font-bold text-blue-soft">75%</p>
        <p className="text-gray-light mt-2">Óptimo</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
        <h3 className="text-xl font-semibold text-green-leaf mb-2">Temperatura</h3>
        <p className="text-4xl font-bold text-blue-soft">22°C</p>
        <p className="text-gray-light mt-2">Ideal</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
        <h3 className="text-xl font-semibold text-green-leaf mb-2">Luz</h3>
        <p className="text-4xl font-bold text-blue-soft">Alta</p>
        <p className="text-gray-light mt-2">Excelente</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
        <h3 className="text-xl font-semibold text-green-leaf mb-2">Último Riego</h3>
        <p className="text-4xl font-bold text-blue-soft">Hace 2 días</p>
        <p className="text-gray-light mt-2">Pronto necesitará agua</p>
      </div>
    </div>
    <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-green-leaf mb-4">Notificaciones</h3>
      <ul className="text-left">
        <li className="flex items-center mb-2 text-gray-800"><DropIcon className="text-blue-soft mr-2"/> Tu <span className="font-semibold text-green-leaf ml-1">Aloe Vera</span> necesita agua.</li>
        <li className="flex items-center mb-2 text-gray-800"><SproutIcon className="text-green-leaf mr-2"/> ¡Excelente crecimiento de tu <span className="font-semibold text-green-leaf ml-1">Albahaca</span> hoy!</li>
        <li className="flex items-center text-gray-800"><HomeIcon className="text-brown-earth mr-2"/> Temperatura en el salón es óptima.</li>
      </ul>
    </div>
  </div>
);

// Componente para la pantalla de Mis Plantas
const MyPlantsScreen = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [isLoadingDiagnosis, setIsLoadingDiagnosis] = useState(false);

  const plants = [
    { id: 1, name: 'Ficus Lyrata', status: 'feliz', avatar: '😊' },
    { id: 2, name: 'Monstera Deliciosa', status: 'sedienta', avatar: '💧' },
    { id: 3, name: 'Suculenta Echeveria', status: 'enferma', avatar: '🤒' },
    { id: 4, name: 'Pothos', status: 'feliz', avatar: '😊' },
  ];

  const openDiagnosisModal = (plant) => {
    setSelectedPlant(plant);
    setSymptoms('');
    setDiagnosis('');
  };

  const closeDiagnosisModal = () => {
    setSelectedPlant(null);
  };

  const getPlantDiagnosis = async () => {
    if (!selectedPlant || symptoms.trim() === '') return;

    setIsLoadingDiagnosis(true);
    setDiagnosis('');

    const prompt = `Mi planta ${selectedPlant.name} tiene los siguientes síntomas: ${symptoms}. ¿Cuál podría ser el problema y cómo lo soluciono? Proporciona una respuesta concisa y útil.`;
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            setDiagnosis(result.candidates[0].content.parts[0].text);
        } else {
            setDiagnosis('Lo siento, no pude generar un diagnóstico. Intenta ser más específico con los síntomas.');
        }
    } catch (error) {
        console.error('Error al llamar a la API de Gemini para diagnóstico:', error);
        setDiagnosis('Hubo un error al obtener el diagnóstico. Inténtalo de nuevo.');
    } finally {
        setIsLoadingDiagnosis(false);
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold text-green-leaf mb-6">Mis Plantas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {plants.map(plant => (
          <div key={plant.id} className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="text-6xl mb-4">{plant.avatar}</div>
            <h3 className="text-xl font-semibold text-green-leaf mb-2">{plant.name}</h3>
            <p className={`font-medium ${plant.status === 'feliz' ? 'text-green-leaf' : plant.status === 'sedienta' ? 'text-blue-soft' : 'text-brown-earth'}`}>
              Estado: {plant.status.charAt(0).toUpperCase() + plant.status.slice(1)}
            </p>
            <button
              onClick={() => openDiagnosisModal(plant)}
              className="mt-4 bg-blue-soft text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-400 transition-all duration-300 flex items-center justify-center text-sm"
            >
              <SparklesIcon className="w-4 h-4 mr-2" /> Diagnóstico
            </button>
          </div>
        ))}
      </div>
      <button className="bg-green-leaf text-white px-8 py-4 rounded-full shadow-lg hover:bg-green-leaf-dark transition-all duration-300 text-lg font-semibold">
        + Agregar Nueva Planta
      </button>

      {/* Modal de Diagnóstico */}
      {selectedPlant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
            <button onClick={closeDiagnosisModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <XIcon className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-green-leaf mb-4">Diagnóstico para {selectedPlant.name}</h3>
            <div className="mb-4">
              <label htmlFor="symptoms" className="block text-gray-700 text-left mb-2">Describe los síntomas:</label>
              <textarea
                id="symptoms"
                className="w-full p-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-green-leaf resize-none"
                rows="4"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Ej: Hojas amarillas, manchas marrones, crecimiento lento..."
              ></textarea>
            </div>
            <button
              onClick={getPlantDiagnosis}
              disabled={isLoadingDiagnosis}
              className="bg-green-leaf text-white px-6 py-3 rounded-full shadow-md hover:bg-green-leaf-dark transition-all duration-300 flex items-center justify-center mx-auto"
            >
              {isLoadingDiagnosis ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analizando...
                </span>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2" /> Obtener Diagnóstico
                </>
              )}
            </button>
            {diagnosis && (
              <div className="mt-6 p-4 bg-green-mint rounded-lg text-left text-gray-800">
                <h4 className="font-semibold text-green-leaf mb-2">Resultado del Diagnóstico:</h4>
                <p>{diagnosis}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente para la pantalla de Riego Automático
const WateringScreen = () => (
  <div className="p-6 text-center">
    <h2 className="text-3xl font-bold text-green-leaf mb-4">Riego Automático</h2>
    <p className="text-gray-light mb-8">Programa y monitorea tu sistema de riego.</p>
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h3 className="text-xl font-semibold text-green-leaf mb-4">Modo de Riego</h3>
      <div className="flex justify-center space-x-4">
        <button className="bg-green-leaf text-white px-6 py-3 rounded-full shadow-md hover:bg-green-leaf-dark transition-all duration-300">
          Manual
        </button>
        <button className="bg-gray-light text-white px-6 py-3 rounded-full shadow-md hover:bg-green-leaf transition-all duration-300">
          Automático
        </button>
      </div>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-green-leaf mb-4">Historial de Riegos</h3>
      <ul className="text-left text-gray-800">
        <li className="mb-2">2025-07-08: Ficus Lyrata (100ml)</li>
        <li className="mb-2">2025-07-07: Monstera Deliciosa (150ml)</li>
        <li>2025-07-05: Suculenta Echeveria (50ml)</li>
      </ul>
      <p className="text-green-leaf mt-4 font-semibold">Ahorro de agua este mes: 50 litros</p>
    </div>
  </div>
);

// Componente para la pantalla de Biblioteca Verde
const LibraryScreen = () => {
  const [plantSearchQuery, setPlantSearchQuery] = useState('');
  const [careTips, setCareTips] = useState('');
  const [isLoadingCareTips, setIsLoadingCareTips] = useState(false);

  const getPlantCareTips = async () => {
    if (plantSearchQuery.trim() === '') {
      setCareTips('Por favor, ingresa el nombre de una planta para obtener consejos.');
      return;
    }

    setIsLoadingCareTips(true);
    setCareTips('');

    const prompt = `Dame consejos de cuidado detallados para la planta llamada "${plantSearchQuery}". Incluye información sobre luz, riego, temperatura, humedad y problemas comunes.`;
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            setCareTips(result.candidates[0].content.parts[0].text);
        } else {
            setCareTips('Lo siento, no pude encontrar consejos de cuidado para esa planta.');
        }
    } catch (error) {
        console.error('Error al llamar a la API de Gemini para consejos de cuidado:', error);
        setCareTips('Hubo un error al obtener los consejos de cuidado. Inténtalo de nuevo.');
    } finally {
        setIsLoadingCareTips(false);
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold text-green-leaf mb-4">Biblioteca Verde</h2>
      <p className="text-gray-light mb-8">Descubre y aprende sobre tus plantas favoritas.</p>
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h3 className="text-xl font-semibold text-green-leaf mb-4">Buscar Plantas</h3>
        <input
          type="text"
          placeholder="Ej. Orquídea, Lavanda..."
          className="w-full p-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-green-leaf"
          value={plantSearchQuery}
          onChange={(e) => setPlantSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              getPlantCareTips();
            }
          }}
        />
        <button
          onClick={getPlantCareTips}
          disabled={isLoadingCareTips}
          className="mt-4 bg-blue-soft text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-400 transition-all duration-300 flex items-center justify-center mx-auto"
        >
          {isLoadingCareTips ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Obteniendo consejos...
            </span>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2" /> Obtener Consejos de Cuidado
            </>
          )}
        </button>

        {careTips && (
          <div className="mt-6 p-4 bg-green-mint rounded-lg text-left text-gray-800">
            <h4 className="font-semibold text-green-leaf mb-2">Consejos de Cuidado para {plantSearchQuery}:</h4>
            <p className="whitespace-pre-wrap">{careTips}</p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="bg-green-mint text-green-leaf px-3 py-1 rounded-full text-sm">Interior</span>
          <span className="bg-green-mint text-green-leaf px-3 py-1 rounded-full text-sm">Exterior</span>
          <span className="bg-green-mint text-green-leaf px-3 py-1 rounded-full text-sm">Huerto</span>
          <span className="bg-green-mint text-green-leaf px-3 py-1 rounded-full text-sm">Medicinal</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-green-leaf mb-4">Sugerencias Personalizadas</h3>
        <p className="text-gray-800">Basado en tus preferencias, te sugerimos:</p>
        <ul className="text-left mt-2 text-gray-800">
          <li className="mb-1">🌱 Poto (Epipremnum aureum) - Fácil de cuidar</li>
          <li>🌱 Lengua de Suegra (Sansevieria trifasciata) - Resistente y purificadora</li>
        </ul>
      </div>
    </div>
  );
};

// Componente para la pantalla de Perfil / Configuración
const ProfileScreen = () => (
  <div className="p-6 text-center">
    <h2 className="text-3xl font-bold text-green-leaf mb-4">Perfil y Configuración</h2>
    <p className="text-gray-light mb-8">Gestiona tu cuenta y personaliza Greeni.</p>
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h3 className="text-xl font-semibold text-green-leaf mb-4">Datos del Usuario</h3>
      <p className="text-gray-800">Nombre: Juan Pérez</p>
      <p className="text-gray-800">Email: juan.perez@example.com</p>
      <button className="mt-4 bg-blue-soft text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-400 transition-all duration-300">
        Editar Perfil
      </button>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-green-leaf mb-4">Ajustes</h3>
      <ul className="text-left text-gray-800">
        <li className="mb-2">Personalización de alertas</li>
        <li className="mb-2">Conexión de sensores y módulos</li>
        <li className="mb-2">Idioma: Español</li>
        <li className="mb-2">Soporte y Ayuda</li>
        <li>Comunidad Greeni</li>
      </ul>
    </div>
  </div>
);

// Componente Chatbot
const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 }); // Posición inicial
  const chatRef = useRef(null); // Referencia para el área de mensajes del chat
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  // Efecto para desplazar el chat hacia abajo cuando se añaden nuevos mensajes
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Limitar el movimiento dentro de la ventana
      const maxX = window.innerWidth - 60; // Ancho del botón (56px) + padding
      const maxY = window.innerHeight - 60; // Alto del botón (56px) + padding

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    // Añadir listeners al documento para arrastrar fuera del botón
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, position]); // Dependencias actualizadas

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage = { sender: 'user', text: inputMessage };
    setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setIsLoadingChat(true);

    const prompt = inputMessage;
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const aiResponseText = result.candidates[0].content.parts[0].text;
            setChatMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: aiResponseText }]);
        } else {
            setChatMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: 'Lo siento, no pude generar una respuesta.' }]);
        }
    } catch (error) {
        console.error('Error al llamar a la API de Gemini:', error);
        setChatMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: 'Hubo un error al conectar con el asistente. Inténtalo de nuevo.' }]);
    } finally {
        setIsLoadingChat(false);
    }
  };

  return (
    <>
      {/* Botón flotante del chatbot */}
      <button
        className="fixed w-14 h-14 bg-green-leaf text-white rounded-full flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing transition-all duration-100 ease-in-out z-50"
        style={{ left: position.x, top: position.y }}
        onMouseDown={handleMouseDown}
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label="Abrir Chatbot"
      >
        <MessageSquareIcon className="w-8 h-8" />
      </button>

      {/* Ventana del Chatbot */}
      {isChatOpen && (
        <div
          className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col z-50 md:w-96 md:h-[500px]"
          style={{
            // Ajusta la posición de la ventana del chat para que no se superponga con el botón
            left: position.x - (isChatOpen ? (window.innerWidth > 768 ? 350 : 250) : 0), // Ajuste para que se abra a la izquierda del botón
            top: position.y - (isChatOpen ? (window.innerWidth > 768 ? 450 : 350) : 0), // Ajuste para que se abra encima del botón
            transform: 'translateY(-10px)', // Pequeño ajuste para que no toque el borde
            transition: 'all 0.3s ease-out',
          }}
        >
          <div className="bg-green-leaf text-white p-4 rounded-t-xl flex justify-between items-center">
            <h3 className="text-lg font-semibold">Asistente Greeni</h3>
            <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-gray-200">
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          <div ref={chatRef} className="flex-grow p-4 overflow-y-auto custom-scrollbar">
            {chatMessages.length === 0 && (
              <p className="text-gray-light text-center mt-4">¡Hola! ¿En qué puedo ayudarte con tus plantas?</p>
            )}
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-blue-soft text-white self-end ml-auto'
                    : 'bg-gray-200 text-gray-800 self-start mr-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoadingChat && (
                <div className="flex items-center justify-center p-2">
                    <svg className="animate-spin h-5 w-5 text-green-leaf" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="ml-2 text-gray-light">Escribiendo...</span>
                </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200 flex">
            <input
              type="text"
              className="flex-grow p-2 border border-gray-light rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-leaf"
              placeholder="Escribe tu mensaje..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
            />
            <button
              onClick={sendMessage}
              className="bg-green-leaf text-white p-2 rounded-r-lg hover:bg-green-leaf-dark transition-all duration-300"
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};


// Componente principal de la aplicación
const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Carga el script de Tailwind CSS y la fuente Poppins
  useEffect(() => {
    // Carga Tailwind CSS
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    tailwindScript.onload = () => {
      // Una vez que Tailwind esté cargado, aplica la configuración personalizada
      const script = document.createElement('script');
      script.innerHTML = tailwindConfig;
      document.head.appendChild(script);
    };
    document.head.appendChild(tailwindScript);

    // Carga la fuente Poppins de Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'my-plants':
        return <MyPlantsScreen />;
      case 'watering':
        return <WateringScreen />;
      case 'library':
        return <LibraryScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-green-mint flex flex-col font-sans text-gray-800 relative pb-20 md:pb-24"> {/* Added padding-bottom to account for fixed bottom nav */}
      {/* Contenido principal */}
      <main className="flex-grow overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4 md:p-8 border-2 border-green-leaf"> {/* Added border here */}
          {renderContent()}
        </div>
      </main>

      {/* Barra de navegación inferior para móvil y desktop */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-2xl z-10 py-3">
        <ul className="flex justify-around">
          <li>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                activeTab === 'dashboard' ? 'bg-green-leaf text-white shadow-md' : 'text-gray-light hover:text-green-leaf hover:bg-green-mint'
              }`}
            >
              <HomeIcon className="w-6 h-6 mb-1 md:w-8 md:h-8" />
              <span className="text-xs md:text-sm">Inicio</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('my-plants')}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                activeTab === 'my-plants' ? 'bg-green-leaf text-white shadow-md' : 'text-gray-light hover:text-green-leaf hover:bg-green-mint'
              }`}
            >
              <SproutIcon className="w-6 h-6 mb-1 md:w-8 md:h-8" />
              <span className="text-xs md:text-sm">Mis Plantas</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('watering')}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                activeTab === 'watering' ? 'bg-green-leaf text-white shadow-md' : 'text-gray-light hover:text-green-leaf hover:bg-green-mint'
              }`}
            >
              <DropIcon className="w-6 h-6 mb-1 md:w-8 md:h-8" />
              <span className="text-xs md:text-sm">Riego</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('library')}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                activeTab === 'library' ? 'bg-green-leaf text-white shadow-md' : 'text-gray-light hover:text-green-leaf hover:bg-green-mint'
              }`}
            >
              <BookIcon className="w-6 h-6 mb-1 md:w-8 md:h-8" />
              <span className="text-xs md:text-sm">Biblioteca</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                activeTab === 'profile' ? 'bg-green-leaf text-white shadow-md' : 'text-gray-light hover:text-green-leaf hover:bg-green-mint'
              }`}
            >
              <UserIcon className="w-6 h-6 mb-1 md:w-8 md:h-8" />
              <span className="text-xs md:text-sm">Perfil</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default App;