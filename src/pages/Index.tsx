import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Slider } from "@/components/ui/slider";

interface App {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [brightness, setBrightness] = useState([70]);
  const [quickSettings, setQuickSettings] = useState([
    { id: "wifi", name: "Wi-Fi", icon: "Wifi", active: true },
    { id: "bluetooth", name: "Bluetooth", icon: "Bluetooth", active: false },
    { id: "flashlight", name: "Фонарик", icon: "Flashlight", active: false },
    { id: "airplane", name: "Авиа", icon: "Plane", active: false },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const apps: App[] = [
    { id: "phone", name: "Телефон", icon: "Phone", color: "bg-green-500" },
    { id: "messages", name: "Сообщения", icon: "MessageSquare", color: "bg-blue-500" },
    { id: "camera", name: "Камера", icon: "Camera", color: "bg-gray-700" },
    { id: "gallery", name: "Галерея", icon: "Image", color: "bg-pink-500" },
    { id: "chrome", name: "Chrome", icon: "Chrome", color: "bg-red-500" },
    { id: "youtube", name: "YouTube", icon: "Youtube", color: "bg-red-600" },
    { id: "settings", name: "Настройки", icon: "Settings", color: "bg-gray-600" },
    { id: "calendar", name: "Календарь", icon: "Calendar", color: "bg-blue-600" },
    { id: "clock", name: "Часы", icon: "Clock", color: "bg-indigo-500" },
    { id: "files", name: "Файлы", icon: "FolderOpen", color: "bg-yellow-500" },
    { id: "music", name: "Музыка", icon: "Music", color: "bg-purple-500" },
    { id: "maps", name: "Карты", icon: "Map", color: "bg-green-600" },
  ];

  const dockApps = apps.slice(0, 4);
  const homeApps = apps.slice(4);

  const toggleQuickSetting = (id: string) => {
    setQuickSettings(quickSettings.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const openApp = (appId: string) => {
    setActiveApp(appId);
    setNotificationOpen(false);
  };

  const closeApp = () => {
    setActiveApp(null);
  };

  const getAppContent = (appId: string) => {
    const app = apps.find(a => a.id === appId);
    
    switch (appId) {
      case "phone":
        return (
          <div className="h-full bg-white flex flex-col">
            <div className="bg-[#FFC700] p-4 text-center">
              <h2 className="text-xl font-bold text-black">Телефон</h2>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
              <div className="w-full max-w-xs">
                <div className="text-4xl text-center mb-8 text-gray-800 font-light tracking-widest">
                  +7 999 123 4567
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num) => (
                    <button
                      key={num}
                      className="aspect-square rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl font-light text-gray-800 transition-colors"
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <button className="w-full mt-6 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2 transition-colors">
                  <Icon name="Phone" size={24} />
                  <span className="text-lg font-medium">Позвонить</span>
                </button>
              </div>
            </div>
          </div>
        );
      case "messages":
        return (
          <div className="h-full bg-white flex flex-col">
            <div className="bg-[#00D9FF] p-4 text-center">
              <h2 className="text-xl font-bold text-white">Сообщения</h2>
            </div>
            <div className="flex-1 overflow-auto">
              {["Мама", "Работа", "Андрей", "Доставка"].map((contact, i) => (
                <div key={i} className="border-b border-gray-200 p-4 flex items-center gap-3 hover:bg-gray-50">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                    {contact[0]}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{contact}</div>
                    <div className="text-sm text-gray-500">Привет! Как дела?</div>
                  </div>
                  <div className="text-xs text-gray-400">14:30</div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 p-3 flex items-center gap-2">
              <input
                type="text"
                placeholder="Написать сообщение..."
                className="flex-1 px-4 py-2 rounded-full bg-gray-100 outline-none"
              />
              <button className="w-10 h-10 rounded-full bg-[#00D9FF] flex items-center justify-center text-white">
                <Icon name="Send" size={20} />
              </button>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="h-full bg-gray-50 flex flex-col">
            <div className="bg-[#FFC700] p-4 text-center">
              <h2 className="text-xl font-bold text-black">Настройки</h2>
            </div>
            <div className="flex-1 overflow-auto">
              {[
                { icon: "Wifi", name: "Wi-Fi", desc: "Подключено" },
                { icon: "Bluetooth", name: "Bluetooth", desc: "Выключено" },
                { icon: "Bell", name: "Уведомления", desc: "Все включены" },
                { icon: "Volume2", name: "Звук", desc: "Звук и вибрация" },
                { icon: "Monitor", name: "Экран", desc: "Яркость, тайм-аут" },
                { icon: "Battery", name: "Батарея", desc: "85%" },
              ].map((setting, i) => (
                <div key={i} className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
                  <Icon name={setting.icon as any} size={24} className="text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{setting.name}</div>
                    <div className="text-sm text-gray-500">{setting.desc}</div>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="h-full bg-white flex flex-col items-center justify-center">
            <Icon name={app?.icon as any} size={80} className="text-gray-400 mb-4" />
            <p className="text-xl text-gray-800">{app?.name}</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="relative w-full max-w-[400px] aspect-[9/19.5] phone-shadow rounded-[3rem] overflow-hidden bg-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-3xl z-50" />

        <div
          className="relative h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('https://cdn.poehali.dev/projects/f35030ad-0807-47d6-8a5b-e0799f623ac4/files/55039a27-359c-4b04-a634-60f5a6d37dc3.jpg')` }}
        >
          <div className="absolute top-0 left-0 right-0 px-6 pt-8 pb-4 flex items-center justify-between text-white z-40">
            <span className="text-sm font-medium">{currentTime.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</span>
            <div className="flex items-center gap-2">
              <Icon name="Signal" size={16} />
              <Icon name="Wifi" size={16} />
              <Icon name="Battery" size={16} />
            </div>
          </div>

          {!activeApp && !notificationOpen && (
            <>
              <div className="absolute inset-0 flex flex-col items-center justify-between pb-32 pt-24">
                <div className="text-center text-white">
                  <div className="text-7xl font-light mb-2">{currentTime.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</div>
                  <div className="text-lg">
                    {currentTime.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}
                  </div>
                </div>

                <div className="w-full px-8 grid grid-cols-4 gap-6">
                  {homeApps.map((app) => (
                    <button key={app.id} className="flex flex-col items-center gap-2 group" onClick={() => openApp(app.id)}>
                      <div className={`w-14 h-14 rounded-2xl ${app.color} app-icon-shadow flex items-center justify-center transition-transform group-active:scale-95`}>
                        <Icon name={app.icon as any} size={28} className="text-white" />
                      </div>
                      <span className="text-xs text-white text-center drop-shadow-lg">{app.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
                <div className="notification-blur rounded-3xl p-4 flex items-center justify-around">
                  {dockApps.map((app) => (
                    <button key={app.id} className="group" onClick={() => openApp(app.id)}>
                      <div className={`w-14 h-14 rounded-2xl ${app.color} app-icon-shadow flex items-center justify-center transition-transform group-active:scale-95`}>
                        <Icon name={app.icon as any} size={28} className="text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-30"
                onClick={() => setNotificationOpen(true)}
              />
            </>
          )}

          {activeApp && (
            <div className="absolute inset-0 bg-white z-50 animate-in slide-in-from-bottom duration-300">
              {getAppContent(activeApp)}
              <button
                className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-300 rounded-full"
                onClick={closeApp}
              />
            </div>
          )}

          {notificationOpen && (
            <div className="absolute top-0 left-0 right-0 notification-blur p-6 pt-12 z-50 animate-in slide-in-from-top duration-300">
              <div className="flex items-center justify-between mb-6 text-white">
                <span className="text-sm font-medium">{currentTime.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</span>
                <div className="flex items-center gap-2">
                  <Icon name="Signal" size={16} />
                  <Icon name="Wifi" size={16} />
                  <Icon name="Battery" size={16} />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {quickSettings.map((setting) => (
                  <button
                    key={setting.id}
                    onClick={() => toggleQuickSetting(setting.id)}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-colors ${
                      setting.active ? "bg-[#00D9FF] text-white" : "bg-white/20 text-white"
                    }`}
                  >
                    <Icon name={setting.icon as any} size={24} />
                    <span className="text-xs">{setting.name}</span>
                  </button>
                ))}
              </div>

              <div className="bg-white/20 rounded-2xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2 text-white">
                  <span className="text-sm">Яркость</span>
                  <span className="text-sm">{brightness[0]}%</span>
                </div>
                <Slider value={brightness} onValueChange={setBrightness} max={100} step={1} />
              </div>

              <div className="space-y-3">
                {["Новое сообщение", "Обновление системы"].map((notif, i) => (
                  <div key={i} className="bg-white/20 rounded-2xl p-4 text-white">
                    <div className="font-medium mb-1">{notif}</div>
                    <div className="text-sm text-white/70">Нажмите для просмотра</div>
                  </div>
                ))}
              </div>

              <button
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/50 rounded-full"
                onClick={() => setNotificationOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
