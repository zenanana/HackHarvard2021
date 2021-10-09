import { Badge } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";

const StyledEventComponent = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#ff78ee',
            color: '#ff78ee',
            boxShadow: `0 0 0 2px`,
            '&::after': {
                position: 'absolute',
                top: -0.5,
                left: -1,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

export default StyledEventComponent