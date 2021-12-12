import Input from '../Input';
import {test_dom_container} from '../../setupTests';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';

test("check no unintended changes have been made to rendered component", () => {
    const component= renderer.create(
        <Input />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    const conponent_with_label = renderer.create(
        <Input labelText="acbdefg" />
    );
});

test("check html elements of Input component", () => {
    act(() => {
        render(<Input />, test_dom_container);
    });

    const ELEMENT = test_dom_container.childNodes;
    expect(ELEMENT[0].tagName).toBe('DIV');

    const CHILDREN = ELEMENT[0].childNodes;
    expect(CHILDREN.length).toBe(2);

    const LABEL_ELEMENT = CHILDREN[0];
    const INPUT_ELEMENT = CHILDREN[1];
    expect(LABEL_ELEMENT.tagName).toBe('LABEL');
    expect(INPUT_ELEMENT.tagName).toBe('INPUT');
});

test("check text content of label for Input component", () => {
    const LABEL_TEXT_PROP = 'abcdefg';

    act(() => {
        render(<Input labelText={LABEL_TEXT_PROP} />, test_dom_container);
    });

    const ELEMENT = test_dom_container.childNodes;
    const CHILDREN = ELEMENT[0].childNodes;
    const LABEL_ELEMENT = CHILDREN[0];

    const RENDERED_LABEL_TEXT = LABEL_ELEMENT.textContent;
    expect(RENDERED_LABEL_TEXT).toBe(LABEL_TEXT_PROP + ': ');
});

test("check input attributes are set correctly for Input component", () => {
    const TYPE_PROP = 'text';
    const NAME_PROP = 'abc';
    const VALUE_PROP = 'def';
    const REQUIRED_PROP = true;
    const DUMMY_ON_CHANGE = jest.fn();

    act(() => {
        render(
            <Input onChange={DUMMY_ON_CHANGE} type={TYPE_PROP} name={NAME_PROP} value={VALUE_PROP} required={REQUIRED_PROP} />,
            test_dom_container
        );
    });

    const ELEMENT = test_dom_container.childNodes;
    const CHILDREN = ELEMENT[0].childNodes;
    const INPUT_ELEMENT = CHILDREN[1];

    const RENDERED_INPUT_TYPE = INPUT_ELEMENT.type;
    expect(RENDERED_INPUT_TYPE).toBe(TYPE_PROP);

    const RENDERED_NAME_PROP = INPUT_ELEMENT.name;
    expect(RENDERED_NAME_PROP).toBe(NAME_PROP);

    const RENDERED_VALUE_PROP = INPUT_ELEMENT.value;
    expect(RENDERED_VALUE_PROP).toBe(VALUE_PROP);

    const RENDERED_REQUIRED_PROP = INPUT_ELEMENT.required;
    expect(RENDERED_REQUIRED_PROP).toBe(REQUIRED_PROP);
});
