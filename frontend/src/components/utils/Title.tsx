import React from 'react';

type Props = {
  title: string;
  subtitle?: string;
  fontSize?: number;
  color?: string;
};

const Title: React.FC<Props> = ({
  title,
  subtitle,
  fontSize = 24,
  color = '#FFF',
}) => {
  return (
    <>
      <div className="flex flex-row">
        <div
          className="w-[1px] bg-white rounded-full"
          style={{ backgroundColor: color }}
        />
        <div className="w-5" />
        <div>
          <div id="title" className="font-light" style={{ fontSize, color }}>
            {title}
          </div>
          <div className="my-[5px]" />
          {subtitle && (
            <>
              <div
                id="subtitle"
                className="font-extralight"
                style={{ fontSize: fontSize / 1.8, color }}
              >
                {subtitle}
              </div>
              <div className="my-[5px]" />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Title;
