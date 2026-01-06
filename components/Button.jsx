'use client';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 min-h-[44px] min-w-[44px]';

  const variantStyles = {
    primary: 'bg-primary-700 text-white hover:bg-primary-800 hover:shadow-elevated active:bg-primary-900',
    secondary: 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 hover:shadow-elevated',
    outline: 'border border-neutral-300 text-primary-700 hover:border-primary-700 hover:shadow-elevated',
    danger: 'bg-danger text-white hover:bg-red-600 hover:shadow-elevated',
  };

  const sizeStyles = {
    sm: 'px-md py-sm text-sm',
    md: 'px-md py-sm text-base',
    lg: 'px-lg py-md text-lg',
    full: 'w-full px-md py-sm text-base',
  };

  const disabledStyles = disabled || isLoading ? 'opacity-60 cursor-not-allowed' : '';

  const buttonClass = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

  return (
    <button
      disabled={disabled || isLoading}
      className={buttonClass}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
