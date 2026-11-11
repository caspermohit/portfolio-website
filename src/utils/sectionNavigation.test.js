import { handleSectionLink, sectionTarget } from './sectionNavigation';

beforeEach(() => { window.history.replaceState(null, '', '/'); document.body.innerHTML = '<a href="#brand-design">Brand</a><section id="brand-design"></section>'; });
test('section navigation updates the address and announces the destination', () => {
 const listener = jest.fn(); window.addEventListener('hashchange', listener);
 document.addEventListener('click', handleSectionLink);
 document.querySelector('a').click();
 expect(window.location.hash).toBe('#brand-design'); expect(listener).toHaveBeenCalledTimes(1);
 document.querySelector('a').click(); expect(listener).toHaveBeenCalledTimes(2);
 document.removeEventListener('click', handleSectionLink); window.removeEventListener('hashchange', listener);
});
test('modified clicks keep native browser behavior', () => {
 const event = { target: document.querySelector('a'), button: 0, ctrlKey: true, preventDefault: jest.fn() };
 handleSectionLink(event); expect(event.preventDefault).not.toHaveBeenCalled(); expect(window.location.hash).toBe('');
});
test('handles encoded and malformed destinations safely', () => {
 document.body.innerHTML = '<section id="design work"></section>';
 expect(sectionTarget('#design%20work')).toBe(document.querySelector('section'));
 expect(sectionTarget('#%')).toBeNull(); expect(sectionTarget('#')).toBeNull();
});
