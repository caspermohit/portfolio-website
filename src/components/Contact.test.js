import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import emailjs from 'emailjs-com';
import Contact from './Contact';
jest.mock('react-router-dom', () => ({ Link: ({children, to, ...props}) => <a href={to} {...props}>{children}</a> }), {virtual:true});
jest.mock('emailjs-com', () => ({ init: jest.fn(), send: jest.fn() }));
jest.mock('./HairlineFigure', () => () => null);
function fillAndSubmit() {
 fireEvent.change(screen.getByLabelText('Name'), {target:{value:'Test Visitor'}});
 fireEvent.change(screen.getByLabelText('Email'), {target:{value:'test@example.com'}});
 fireEvent.change(screen.getByLabelText('Message'), {target:{value:'A project inquiry'}});
 fireEvent.submit(screen.getByRole('button',{name:'Send message →'}).closest('form'));
}
test('failed delivery preserves the message and offers explicit recovery', async () => {
 emailjs.send.mockRejectedValueOnce(new Error('Service unavailable'));
 render(<Contact />); fillAndSubmit();
 await screen.findByText(/Couldn’t send the message/);
 expect(screen.getByLabelText('Message').value).toBe('A project inquiry');
 expect(screen.getByRole('button',{name:'Copy message'})).toBeTruthy();
 expect(screen.getByRole('button',{name:'Open email draft →'})).toBeTruthy();
});
test('successful service response clears the form and confirms receipt', async () => {
 emailjs.send.mockResolvedValueOnce({status:200});
 render(<Contact />); fillAndSubmit();
 await screen.findByText(/Got it/);
 await waitFor(()=>expect(screen.getByLabelText('Message').value).toBe(''));
});
