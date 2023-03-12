import {useCurrentBreakpointName} from 'react-socks';

export const checkIsMobile = (sizes: string[] = ['md', 'sm', 'xs']) => {
    const breakpointName = useCurrentBreakpointName();
    return sizes.includes(breakpointName);
};
