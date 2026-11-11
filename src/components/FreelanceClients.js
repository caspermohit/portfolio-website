import ScrollInk from './ScrollInk';
import Doodle from './Doodle';
import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { freelanceClients } from '../data/clients';
import './FreelanceClients.css';

export default function FreelanceClients() {
    return <section className="freelance-clients" id="clients" aria-labelledby="freelance-clients-title"><div className="clients-intro"><div><p className="eyebrow">Independent work</p><h2 id="freelance-clients-title"><ScrollInk>Good work starts<br />with good people.</ScrollInk></h2></div><div className="clients-doodle-note"><Doodle name="doggie" className="collaboration-doodle" /><p>A few of the businesses I’ve worked<br />with as a freelance collaborator.</p></div></div><ul className="client-logo-grid">{freelanceClients.map(client => {
        const mark = <><div className={`client-mark mark-${client.shape}`}>{client.shape === 'exhibera' ? <span className="exhibera-client-wordmark">exhibera<span>.</span></span> : client.logo ? <img src={client.logo} alt={`${client.name} logo`} loading="lazy" /> : <span className="client-name-fallback">{client.name}</span>}{client.shape === 'shield' && <span className="client-lockup-name">{client.name}</span>}</div><span className="client-caption">{client.name}{(client.website || client.project) && <FiArrowUpRight size={14} />}</span></>;
        return <li key={client.name}>{(client.website || client.project) ? <a href={client.website || client.project} target={client.website ? '_blank' : undefined} rel={client.website ? 'noopener noreferrer' : undefined} aria-label={client.website ? `Visit ${client.name}` : `Explore ${client.name} design work`}>{mark}</a> : <div className="client-without-link">{mark}</div>}</li>;
    })}</ul></section>;
}
