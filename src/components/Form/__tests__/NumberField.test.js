import { render, screen } from '@testing-library/react';
import NumberField from '../NumberField';

test('renders NumberField component with the given props', () => {
	render(<NumberField fieldName="test" title="Just a Test" inputChange={() => {}} values={'Testing'} isRequired={false}/>);
	const linkElement = screen.getByText('Just a Test');
	expect(linkElement).toBeInTheDocument();
});

test('renders NumberField component with message', () => {
	render(<NumberField fieldName="test" title="Just a Test" inputChange={() => {}} values={'test'} isRequired={false} message='it is just a test'/>);
	const linkElement = screen.getByText('it is just a test');
	expect(linkElement).toBeInTheDocument();
});