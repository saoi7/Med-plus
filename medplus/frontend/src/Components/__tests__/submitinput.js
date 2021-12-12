import SubmitInput from '../SubmitInput';
import {test_dom_container} from '../../setupTests';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';

test("check no unintended changes have been made to rendered component", () => {
    const component= renderer.create(
        <SubmitInput />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("check html elements of SubmitInput component", () => {
    act(() => {
        render(<SubmitInput />, test_dom_container);
    });

    const ELEMENT = test_dom_container.childNodes;
    expect(ELEMENT[0].tagName).toBe('DIV');

    const CHILDREN = ELEMENT[0].childNodes;
    expect(CHILDREN.length).toBe(1);

    const INPUT_ELEMENT = CHILDREN[0];
    expect(INPUT_ELEMENT.tagName).toBe('INPUT');
});

test("check SubmitInput text content", () => {
    const TEXT_PROP = 'abcdefg';
    act(() => {
        render(<SubmitInput labelText={TEXT_PROP} />, test_dom_container);
    });

    const ELEMENT = test_dom_container.childNodes;

    const INPUT_ELEMENT = ELEMENT[0].childNodes[0];
    expect(INPUT_ELEMENT.value).toBe(TEXT_PROP);
});
