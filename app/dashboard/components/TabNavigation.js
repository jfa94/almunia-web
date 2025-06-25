"use client";

export default function TabNavigation({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="tabs tabs-boxed bg-base-200 font-semibold">
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
