import _ from '../setupTests';
import * as ROUTES from '../constants/routes';

test("make sure all routes are defined", () => {
    expect(ROUTES.LANDING).toBeDefined();
    expect(ROUTES.SIGN_UP).toBeDefined();
    expect(ROUTES.SIGN_IN).toBeDefined();
    expect(ROUTES.SIGN_OUT).toBeDefined();
    expect(ROUTES.HOME).toBeDefined();
    expect(ROUTES.ACCOUNT).toBeDefined();
    expect(ROUTES.ADMIN).toBeDefined();
    expect(ROUTES.PASSWORD_FORGET).toBeDefined();
    expect(ROUTES.ADD_MED).toBeDefined();
    expect(ROUTES.EDIT_MED).toBeDefined();
    expect(ROUTES.MANAGE_MEDS).toBeDefined();
});
