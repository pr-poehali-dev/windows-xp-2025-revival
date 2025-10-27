import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";

interface WindowState {
  id: string;
  title: string;
  icon: string;
  component: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

const Index = () => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const desktopIcons = [
    { id: "my-computer", name: "Мой компьютер", icon: "Monitor" },
    { id: "recycle-bin", name: "Корзина", icon: "Trash2" },
    { id: "notepad", name: "Блокнот", icon: "FileText" },
    { id: "paint", name: "Paint", icon: "Paintbrush" },
    { id: "ie", name: "Internet Explorer", icon: "Globe" },
    { id: "media-player", name: "Media Player", icon: "Music" },
  ];

  const startMenuItems = [
    { id: "ie", name: "Internet Explorer", icon: "Globe" },
    { id: "notepad", name: "Блокнот", icon: "FileText" },
    { id: "paint", name: "Paint", icon: "Paintbrush" },
    { id: "media-player", name: "Windows Media Player", icon: "Music" },
    { id: "minesweeper", name: "Сапёр", icon: "Bomb" },
    { id: "explorer", name: "Проводник", icon: "FolderOpen" },
  ];

  const openWindow = (id: string, title: string, icon: string) => {
    const existingWindow = windows.find((w) => w.id === id);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows(
          windows.map((w) =>
            w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
          )
        );
        setNextZIndex(nextZIndex + 1);
      } else {
        bringToFront(id);
      }
      return;
    }

    const newWindow: WindowState = {
      id,
      title,
      icon,
      component: getWindowContent(id),
      isOpen: true,
      isMinimized: false,
      position: { x: 50 + windows.length * 30, y: 50 + windows.length * 30 },
      size: { width: 600, height: 400 },
      zIndex: nextZIndex,
    };

    setWindows([...windows, newWindow]);
    setNextZIndex(nextZIndex + 1);
    setStartMenuOpen(false);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  };

  const bringToFront = (id: string) => {
    setWindows(
      windows.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex } : w))
    );
    setNextZIndex(nextZIndex + 1);
  };

  const startDrag = (id: string, e: React.MouseEvent) => {
    const window = windows.find((w) => w.id === id);
    if (!window) return;

    setDraggedWindow(id);
    setDragOffset({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    });
    bringToFront(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedWindow) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    setWindows(
      windows.map((w) =>
        w.id === draggedWindow
          ? { ...w, position: { x: Math.max(0, newX), y: Math.max(0, newY) } }
          : w
      )
    );
  };

  const handleMouseUp = () => {
    setDraggedWindow(null);
  };

  const getWindowContent = (id: string) => {
    switch (id) {
      case "ie":
        return (
          <div className="h-full flex flex-col bg-white">
            <div className="bg-[#ECE9D8] border-b border-gray-300 px-3 py-1 flex items-center gap-2">
              <input
                type="text"
                defaultValue="https://www.poehali.dev"
                className="flex-1 px-2 py-1 border border-gray-400 rounded-sm"
              />
              <button className="px-3 py-1 bg-[#ECE9D8] border border-gray-400 rounded-sm hover:bg-gray-200">
                Переход
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center text-gray-600 flex-col gap-4">
              <Icon name="Globe" size={64} className="text-blue-500" />
              <p className="text-xl">Internet Explorer 2025</p>
              <p className="text-sm text-gray-500">Введите адрес в строке выше</p>
            </div>
          </div>
        );
      case "notepad":
        return (
          <div className="h-full bg-white">
            <textarea
              className="w-full h-full p-3 resize-none border-none outline-none font-mono"
              placeholder="Начните вводить текст..."
            />
          </div>
        );
      case "paint":
        return (
          <div className="h-full bg-white flex flex-col">
            <div className="bg-[#ECE9D8] border-b border-gray-300 px-3 py-2 flex gap-2">
              <div className="w-8 h-8 bg-black border border-gray-400" />
              <div className="w-8 h-8 bg-red-500 border border-gray-400" />
              <div className="w-8 h-8 bg-blue-500 border border-gray-400" />
              <div className="w-8 h-8 bg-yellow-400 border border-gray-400" />
              <div className="w-8 h-8 bg-green-500 border border-gray-400" />
            </div>
            <div className="flex-1 bg-white flex items-center justify-center text-gray-400">
              <Icon name="Paintbrush" size={64} />
            </div>
          </div>
        );
      case "minesweeper":
        return (
          <div className="h-full bg-[#ECE9D8] flex items-center justify-center flex-col gap-4">
            <div className="text-4xl">💣</div>
            <p className="text-lg font-bold">Сапёр</p>
            <button className="px-4 py-2 bg-[#ECE9D8] border-2 border-t-white border-l-white border-r-gray-600 border-b-gray-600 hover:bg-gray-200">
              Новая игра
            </button>
          </div>
        );
      case "media-player":
        return (
          <div className="h-full bg-gradient-to-b from-blue-900 to-black flex items-center justify-center flex-col gap-4 text-white">
            <Icon name="Music" size={64} />
            <p className="text-xl">Windows Media Player</p>
            <div className="flex gap-2 mt-4">
              <button className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center">
                <Icon name="Play" size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center">
                <Icon name="Pause" size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center">
                <Icon name="Square" size={20} />
              </button>
            </div>
          </div>
        );
      case "explorer":
        return (
          <div className="h-full flex flex-col bg-white">
            <div className="bg-[#ECE9D8] border-b border-gray-300 px-3 py-2">
              <div className="flex items-center gap-2">
                <Icon name="Folder" size={16} />
                <span className="text-sm">C:\Документы</span>
              </div>
            </div>
            <div className="flex-1 p-4">
              <div className="grid grid-cols-4 gap-4">
                {["Мои документы", "Мои рисунки", "Моя музыка", "Видео"].map((folder) => (
                  <div key={folder} className="flex flex-col items-center gap-2 p-2 hover:bg-blue-100 rounded cursor-pointer">
                    <Icon name="Folder" size={48} className="text-yellow-500" />
                    <span className="text-xs text-center">{folder}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return <div className="h-full bg-white flex items-center justify-center">Содержимое окна</div>;
    }
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-cover bg-center relative select-none"
      style={{ backgroundImage: "url('https://cdn.poehali.dev/projects/f35030ad-0807-47d6-8a5b-e0799f623ac4/files/56f3da77-1110-444d-b44a-0604f21cc6c5.jpg')" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="grid grid-cols-1 gap-4 p-4 w-32">
        {desktopIcons.map((icon) => (
          <button
            key={icon.id}
            className="flex flex-col items-center gap-1 p-2 hover:bg-blue-400/30 rounded transition-colors group"
            onDoubleClick={() => openWindow(icon.id, icon.name, icon.icon)}
          >
            <div className="w-12 h-12 bg-white/80 rounded flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Icon name={icon.icon as any} size={28} className="text-blue-600" />
            </div>
            <span className="text-xs text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center">
              {icon.name}
            </span>
          </button>
        ))}
      </div>

      {windows.map((window) => (
        <Card
          key={window.id}
          className={`absolute window-shadow transition-opacity ${
            window.isMinimized ? "hidden" : "block"
          }`}
          style={{
            left: window.position.x,
            top: window.position.y,
            width: window.size.width,
            height: window.size.height,
            zIndex: window.zIndex,
          }}
          onMouseDown={() => bringToFront(window.id)}
        >
          <div
            className="window-titlebar h-8 flex items-center justify-between px-2 cursor-move"
            onMouseDown={(e) => startDrag(window.id, e)}
          >
            <div className="flex items-center gap-2">
              <Icon name={window.icon as any} size={16} className="text-white" />
              <span className="text-white text-sm font-bold">{window.title}</span>
            </div>
            <div className="flex gap-1">
              <button
                className="w-5 h-5 bg-[#0053ee] hover:bg-[#0063ff] flex items-center justify-center text-white text-xs font-bold border border-[#003c74]"
                onClick={() => minimizeWindow(window.id)}
              >
                _
              </button>
              <button
                className="w-5 h-5 bg-[#0053ee] hover:bg-[#ff0000] flex items-center justify-center text-white text-xs font-bold border border-[#003c74]"
                onClick={() => closeWindow(window.id)}
              >
                ×
              </button>
            </div>
          </div>
          <div className="bg-[#ECE9D8] border-t border-gray-300" style={{ height: "calc(100% - 32px)" }}>
            {window.component}
          </div>
        </Card>
      ))}

      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-[#0997ff] to-[#0053ee] border-t-2 border-[#1aa7ff] shadow-[0_-2px_8px_rgba(0,0,0,0.3)] flex items-center px-1 gap-1">
        <button
          className="start-button h-8 px-3 text-white text-sm font-bold flex items-center gap-2 rounded-sm transition-all active:shadow-inner"
          onClick={() => setStartMenuOpen(!startMenuOpen)}
        >
          <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
            <Icon name="Grip" size={14} className="text-green-600" />
          </div>
          Пуск
        </button>

        <div className="flex-1 flex gap-1">
          {windows
            .filter((w) => !w.isMinimized)
            .map((window) => (
              <button
                key={window.id}
                className="h-8 px-3 bg-[#0053ee]/80 hover:bg-[#0063ff] text-white text-xs flex items-center gap-2 rounded-sm border border-[#003c74] shadow-sm"
                onClick={() => bringToFront(window.id)}
              >
                <Icon name={window.icon as any} size={14} />
                <span className="max-w-[150px] truncate">{window.title}</span>
              </button>
            ))}
        </div>

        <div className="h-8 px-3 bg-[#12c8ff] rounded-sm flex items-center gap-2 text-white text-xs font-bold border border-[#00aaff]">
          <Icon name="Volume2" size={14} />
          <Icon name="Wifi" size={14} />
          <span>{new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>

      {startMenuOpen && (
        <div className="absolute bottom-10 left-0 w-96 bg-gradient-to-r from-[#0053ee] via-[#0053ee] to-[#1aa7ff] rounded-tr-lg shadow-2xl overflow-hidden">
          <div className="flex">
            <div className="w-12 bg-[#0053ee] flex flex-col items-center py-4">
              <div className="text-white text-xs font-bold rotate-[-90deg] origin-center whitespace-nowrap mt-20">
                Windows XP 2025
              </div>
            </div>
            <div className="flex-1 bg-white">
              <div className="p-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    Ю
                  </div>
                  <span className="font-bold text-lg">Пользователь</span>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  {startMenuItems.map((item) => (
                    <button
                      key={item.id}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-500 hover:text-white rounded transition-colors"
                      onClick={() => openWindow(item.id, item.name, item.icon)}
                    >
                      <Icon name={item.icon as any} size={24} />
                      <span className="text-sm">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-[#0053ee] p-3 flex justify-between">
                <button className="flex items-center gap-2 px-3 py-1 bg-[#1aa7ff] hover:bg-[#2ab7ff] text-white rounded text-xs">
                  <Icon name="Power" size={14} />
                  Выключение
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
