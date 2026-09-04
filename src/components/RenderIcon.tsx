import React from 'react';
import Icon from '@ant-design/icons';

interface SchemaIconProps {
  icon?: React.ComponentType<any>;
  style?: React.CSSProperties;
  className?: string;
}

const RenderIcon: React.FC<SchemaIconProps> = ({ 
  icon: IconComponent, 
  style, 
  className 
}) => {
  if (!IconComponent) return null;
  const isAntdIcon = Boolean(IconComponent.displayName)
  const baseStyle: React.CSSProperties = {
    fontSize: '1.25em',
    marginRight: '0.25rem',
    ...style,
  }
  if (isAntdIcon) {
    return <Icon component={IconComponent} style={baseStyle} className={className} />;
  }

  return (
    <span
    className={`${className || ''}`}
    style={{ display: 'inline-block', lineHeight: '0', textAlign: 'center', verticalAlign: '-0.25em', marginRight: '0.25rem' }}
    >
      <IconComponent style={{ display: 'inline-block', width: '1.25em', height: '1.25em' }} />
    </span>
  );
};

export default RenderIcon;