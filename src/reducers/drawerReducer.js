import C from '../constants';

const initialState = {
  shouldBeDocked: true,
  wantItDocked: true,
  opened: true,
};

export default function drawerReducer(currentState = initialState, action) {
  switch (action.type) {
    case C.DOCK_DRAWER:
      return {
        ...currentState,
        wantItDocked: true,
      };
    case C.UNDOCK_DRAWER:
      return {
        ...currentState,
        wantItDocked: false,
      };
    case C.SHOULD_DOCK_DRAWER:
      return {
        ...currentState,
        shouldBeDocked: true,
      };
    case C.SHOULD_UNDOCK_DRAWER:
      return {
        ...currentState,
        shouldBeDocked: false,
      };
    case C.OPEN_DRAWER:
      return {
        ...currentState,
        opened: true,
      };
    case C.CLOSE_DRAWER:
      return {
        ...currentState,
        opened: false,
      };
    default:
      return currentState;
  }
}
