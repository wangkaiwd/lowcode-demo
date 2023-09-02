import { useEffect, useRef, useState } from 'react';
import { Input, InputRef } from 'antd';
import { useEditorStore } from '../../store/editStore.ts';
import { getSelectedComponent, updateSelectedComponents } from '../../store/helper.ts';

interface TextProps {
  value: string;
}

const Text = (props: TextProps) => {
  const { value: defaultValue } = props;
  const [value, setValue] = useState(defaultValue);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const editorStoreState = useEditorStore();
  const selectedComponent = getSelectedComponent(editorStoreState);
  const onDoubleClick = () => {
    setEditing(true);
  };

  // update after view render
  useEffect(() => {
    if (editing) {
      if (!inputRef.current) {return;}
      inputRef.current?.focus();
    }
  }, [editing]);
  return (
    <div onDoubleClick={onDoubleClick}>
      {
        editing ?
          <Input.TextArea
            ref={inputRef}
            autoSize
            style={{
              height: selectedComponent?.props?.wrapperStyle?.height
            }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onResize={({ height }) => {
              updateSelectedComponents({
                wrapperStyle: { height }
              });
            }}
            onBlur={() => {
              setEditing(false);
            }}
          />
          :
          value
      }
    </div>
  );
};

export default Text;
