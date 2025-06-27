"use client";

export default function TabNavigation({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="tabs tabs-boxed p-0 sm:p-1 font-semibold bg-white shadow-inner border">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'bg-slate-700 font-bold text-white' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </a>
      ))}
    </div>
  )
}
