import { authReducer } from '../../auth/authReducer'
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {
    test('debe retornar el estado por defecto', () => {
        const state = authReducer({ logged: false }, {});
        expect(state).toEqual({ logged: false });
    });
    
    test('debe autenticar y colocar el nombre del usuario', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'José'
            }
        }

        const state = authReducer({ logged: false }, action);
        expect(state).toEqual({ 
            logged: true,
            name: 'José'
        });
    });

    test('debe borrar el nombre del usuario y logged en false', () => {
        const action = {
            type: types.logout,
        }

        const state = authReducer({ logged: true, name: 'Pedro' }, action);
        expect(state).toEqual({ 
            logged: false
        });
    });
})
