import { mount } from "enzyme"
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

describe('Pruebas en LoginScreen', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false,
        }
    }

    const history = {
        replace: jest.fn(),
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history={ history }/>
        </AuthContext.Provider>
    );
    
    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de realizar el dispatch y la navegación', () => {
        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Luis'
            }
        });

        expect(history.replace).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/dc');

        handleClick();
        expect(history.replace).toHaveBeenCalledWith('/dc');
    })
    
})
