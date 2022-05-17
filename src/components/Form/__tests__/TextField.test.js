import { render, screen } from '@testing-library/react';
import TextField from '../Fields/TextField';

test('renders TextField component with the given props', () => {
	render(<TextField fieldName="test" title="Just a Test" inputChange={() => {}} value={'Testing'} />);
	const linkElement = screen.getByText('Just a Test');
	expect(linkElement).toBeInTheDocument();
});