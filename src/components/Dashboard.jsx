import { useMemo, useState } from "react";
import { recommend, lastWear, ago } from "../lib/wardrobe.js";
import Icon from "./Icon.jsx";

const destinations = [
  ["College", "🎓", "Everyday campus outfits"],
  ["Office", "💼", "Professional and smart"],
  ["Date", "♡", "Casual and stylish"],
  ["Party", "🎉", "Something for the evening"],
];

export default function Dashboard({ items, history, occasion, dressStyle, preferred, connected, pending, loading, onWear, onAdd, onNavigate, onOccasion, renderCard }) {
  const [index, setIndex] = useState(0);
  const active = items.filter(item => !item.archived);
  const available = active.filter(item => !item.laundry);
  const laundry = active.filter(item => item.laundry);
  const looks = useMemo(() => recommend(items, history, occasion, "", preferred, dressStyle), [items, history, occasion, preferred, dressStyle]);
  const look = looks[index % Math.max(1, looks.length)];
  const recent = look?.items.map(item => ({ item, wear: lastWear(history, item.id, occasion) })).filter(row => row.wear).sort((a, b) => Date.parse(b.wear.wornAt) - Date.parse(a.wear.wornAt))[0];
  const now = new Date();
  const monthCount = history.filter(wear => { const date = new Date(wear.wornAt); return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear(); }).length;

  return <div className="review-dashboard">
    <section className="dashboard-hero" aria-labelledby="today-heading">
      <div className="dashboard-hero-copy">
        <p className="eyebrow">TODAY’S OUTFIT</p>
        <h2 id="today-heading">{look ? `Your ${occasion.toLowerCase()} look` : "Your next look"}</h2>
        <p>{look ? look.items.map(item => item.name).join(" · ") : "A wardrobe that works together. Add your clothes to build your first outfit."}</p>
        <div className="dashboard-hero-actions">
          <button className="button hero-primary" disabled={!connected || pending} onClick={() => look ? onWear(look) : onAdd()}><Icon name={look ? "check" : "plus"} size={17} />{look ? "Wear this" : "Add your first piece"}</button>
          <button className="button hero-secondary" disabled={pending || loading || !connected} onClick={() => looks.length > 1 ? setIndex(value => value + 1) : onNavigate("outfits")}><span aria-hidden="true">↻</span> {looks.length > 1 ? "Try another" : "Outfit maker"}</button>
        </div>
      </div>
      <div className="dashboard-look" aria-label="Outfit pieces">
        {(look ? look.items : [null, null, null]).map((item, position) => <div className="dashboard-look-tile" key={item?.id || position}>
          {item ? <img src={item.photo} alt={item.name} /> : <><span aria-hidden="true">{["👕", "👖", "👟"][position]}</span><small>{["Your top", "Your pants", "Your shoes"][position]}</small></>}
        </div>)}
      </div>
    </section>

    <section className={`dashboard-notice ${recent ? "has-history" : ""}`}>
      <span className="dashboard-notice-icon" aria-hidden="true">{recent ? "↻" : "✦"}</span>
      <div><p className="eyebrow">{recent ? "OUTFIT HISTORY" : "MAKE IT YOURS"}</p><h3>{recent ? "A familiar piece in today’s outfit." : "Your clothes. Your combinations."}</h3><p>{recent ? `${recent.item.name} was worn to ${recent.wear.occasion} ${ago(recent.wear.wornAt).toLowerCase()}.` : "Pick a style and an occasion in the outfit maker to find a look for your day."}</p></div>
      <button className="text-button" onClick={() => onNavigate(recent ? "history" : "outfits")}>{recent ? "View history" : "Choose a look"} <Icon name="arrow" size={16} /></button>
    </section>

    <section className="dashboard-stats" aria-label="Wardrobe summary">
      {[["wardrobe", available.length, "Available clothes"], ["laundry", laundry.length, "In laundry"], ["history", monthCount, "Outfits this month"], ["spark", looks.length, "Outfit ideas"]].map(([icon, count, label]) => <div className="dashboard-stat" key={label}><span><Icon name={icon} size={23} /></span><div><strong>{loading ? "—" : count}</strong><p>{label}</p></div></div>)}
    </section>

    <section className="section" id="dashboard-occasions">
      <div className="section-heading"><div><p className="eyebrow">WHERE ARE YOU GOING?</p><h2>My occasions</h2></div><button className="text-button" onClick={() => onNavigate("outfits")}>Explore outfits <Icon name="arrow" size={16} /></button></div>
      <div className="dashboard-occasions">{destinations.map(([name, icon, description]) => <button key={name} onClick={() => { onOccasion(name); onNavigate("outfits"); }}><span aria-hidden="true">{icon}</span><strong>{name}</strong><p>{description}</p><small>Find a look <Icon name="arrow" size={14} /></small></button>)}</div>
    </section>

    <section className="section">
      <div className="section-heading"><div><p className="eyebrow">YOUR CLOSET</p><h2>My wardrobe</h2></div><button className="text-button" onClick={() => onNavigate("wardrobe")}>View all <Icon name="arrow" size={16} /></button></div>
      {active.length ? <div className="clothes-grid">{active.slice(0, 4).map(renderCard)}</div> : <div className="dashboard-empty"><Icon name="wardrobe" size={30} /><div><h3>A little room for your favourites.</h3><p>Add shirts, pants and shoes to start your personal collection.</p></div><button className="button primary" disabled={!connected} onClick={onAdd}>Add clothing</button></div>}
    </section>
  </div>;
}
