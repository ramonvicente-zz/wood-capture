import { render, screen } from '@testing-library/react';
import SelectField from '../SelectField';

test('renders SelectField component with the given props', () => {
    const options = [{ name:'test1', value:'test1' }, { name:'test2', value:'test2' }]
	render(<SelectField fieldName="test" title="Test Select" inputChange={() => {}} values={'Testing'} isRequired={false} defaultValue='select an option' options={options}/>);
	const linkElement = screen.getByText('Test Select');
    
	expect(linkElement).toBeInTheDocument();
});