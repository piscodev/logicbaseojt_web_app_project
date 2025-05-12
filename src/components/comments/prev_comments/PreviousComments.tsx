import { dateConv } from '@/lib/DateConverter'
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Box, Button, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { Comments } from '@/app/utils/interfaces';

const PreviousComments: React.FC<Comments> = ({ comment, onDelete }) =>
{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const isMenuOpen = Boolean(anchorEl)

    const { data: session } = useSession()
    const isOwner = session?.user?.id === comment.commenter_user_id

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)
    const handleDelete = () =>
    {
        handleMenuClose()
        onDelete?.(comment.comment_id)
    }

    return (
        <Box
            sx={{
                position: 'relative',
                boxShadow: 'none',
            }}
        >
            {isOwner && (
                <>
                    <Button
                        size="small"
                        onClick={handleMenuOpen}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: -15,
                            padding: 0,
                            color: 'text.secondary',
                            '&:hover': { backgroundColor: 'transparent' },
                        }}
                    >
                        <MoreVertIcon fontSize="small" />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                </>
            )}

            <Box display="flex" alignItems="flex-start" gap={2}>
                <Avatar
                    alt={comment.first_name}
                    src={comment.profile_image || 'https://randomuser.me/api/portraits/thumb/women/65.jpg'}
                    sx={{ width: 32, height: 32 }}
                />
                <Box>
                    <Typography variant="body2" color="text.primary" component="div">
                        {comment.first_name} {comment.last_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontSize={11} component="div">
                        {dateConv(comment.created_at)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1} component="div">
                        {comment.comment_text}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default PreviousComments