import { dateConv } from '@/lib/DateConverter'
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Paper, Typography } from '@mui/material';

interface Comments
{
    comment:
    {
        comment_id: string,
        comment_post_id: string,
        commenter_user_id: string,
        comment_text: string,
        created_at: string,
        updated_at: string,
        first_name: string,
        last_name: string,
        profile_image: string,
    }
    onDelete?: (commentId: string) => void;
}

// const PreviousComments: React.FC<Comments> = ({ comment }) =>
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
                    <Typography variant="body2" color="text.primary">
                        {comment.first_name} {comment.last_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontSize={11}>
                        {dateConv(new Date(comment.created_at).getTime())}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                        {comment.comment_text}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default PreviousComments