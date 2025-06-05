
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoRestrictions } from '@/utils/demoRestrictions';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  action: string;
  onClick: () => void;
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
  requiresAuth?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  onClick,
  children,
  variant = "default",
  size = "default",
  className,
  disabled = false,
  requiresAuth = true,
  ...props
}) => {
  const { isDemoMode } = useAuth();
  const { checkDemoRestriction } = useDemoRestrictions();

  const handleClick = () => {
    if (requiresAuth && isDemoMode) {
      checkDemoRestriction(true, action);
      return;
    }
    onClick();
  };

  const isDisabled = disabled || (requiresAuth && isDemoMode);

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        className,
        isDisabled && 'opacity-50 cursor-not-allowed'
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
