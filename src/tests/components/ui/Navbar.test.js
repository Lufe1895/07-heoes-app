import { mount } from "enzyme"
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/NavBar";
import { types } from "../../../types/types";

describe('Pruebas en <Navbar />', () => {
    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        listen: jest.fn(),
        createHref: jest.fn(),
        location: {},
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Luis'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter>
                <Router history={ historyMock }>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Luis');
    })

    test('debe llamar el logout y usar history', () => {
        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalledWith({ type: types.logout });

        expect(historyMock.replace).toHaveBeenCalledWith('/login');
    })
    
})
