import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HairlineExperience from './HairlineExperience';
jest.mock('gsap', () => ({registerPlugin:jest.fn(),matchMedia:()=>({add:(_query, setup)=>setup(),revert:jest.fn()})}));
jest.mock('gsap/ScrollTrigger',()=>({ScrollTrigger:{create:jest.fn(()=>({isActive:false}))}}));
jest.mock('./HairlineFigure',()=>({__esModule:true,default:()=>null,useIllustrationMotion:()=>({playing:false,reduced:false,toggle:jest.fn()})}));
test('scroll visits each craft panel, stays valid at the end, and reverses',()=>{
 render(<HairlineExperience />);
 const update=ScrollTrigger.create.mock.calls[0][0].onUpdate;
 for(const [progress,label] of [[0,'The interface'],[.45,'The system'],[.9,'The feeling'],[1,'The feeling'],[.1,'The interface']]){
  act(()=>update({progress}));
  expect(screen.getByRole('tab',{name:label}).getAttribute('aria-selected')).toBe('true');
  expect(screen.getByRole('tabpanel').getAttribute('aria-labelledby')).toBe(screen.getByRole('tab',{name:label}).id);
 }
});
