import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { freelanceClients } from '../data/clients';
import './FreelanceClients.css';

export default function FreelanceClients() {
    return <section className="freelance-clients" id="clients" aria-labelledby="freelance-clients-title"><div className="clients-intro"><div><p className="eyebrow">Independent work</p><h2 id="freelance-clients-title">Good work starts<br />with good people.</h2></div><p>A few of the businesses I’ve worked<br />with as a freelance collaborator.</p></div><ul className="client-logo-grid">{freelanceClients.map(client => {
        const mark = <><div className={`client-mark mark-${client.shape}`}>{client.logo ? <img src={client.logo} alt={`${client.name} logo`} loading="lazy" /> : <span className="client-name-fallback">{client.name}</span>}{client.shape === 'shield' && <span className="client-lockup-name">{client.name}</span>}</div><span className="client-caption">{client.name}{client.website && <FiArrowUpRight size={14} />}</span></>;
        return <li key={client.name}>{client.website ? <a href={client.website} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${client.name}`}>{mark}</a> : <div className="client-without-link">{mark}</div>}</li>;
    })}</ul></section>;
}
