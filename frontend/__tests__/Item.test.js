import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ItemComponent from '../components/Item';

const fakeItem = {
    id: 'ABC123',
    title: 'A Cool Item',
    price: 5000,
    description: 'This item is really cool!',
    image: 'dog.jpg',
    largeImage: 'largedog.jpg',
};

describe('<Item/>', () => {
    it('renders', () => {
        shallow(<ItemComponent item={fakeItem} />);
    });

    it('renders and matches the snapshot', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem} />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
