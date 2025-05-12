'use client'

import React, { useState } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    ClickAwayListener,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const OptionsMenu: React.FC<{ currentUserId: string; postId: string; onDelete?: (postId: string) => void }> = ({ currentUserId, postId, onDelete }) =>
{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const deletePost = async () =>
    {
        if (!currentUserId || !postId)
            return

        setIsDeleting(true)

        try
        {
            const res = await fetch('/api/posts/delete_post',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, currentUserId }),
            })

            if (!res.ok)
                console.error('Error deleting post:', res.statusText)

            const data = await res.json()
            if (data.type === 'error')
            {
                toast.error(data.message || 'Error deleting post')
                return
            }

            toast.success(data.message || 'Post deleted successfully!')
            handleClose()
            if (onDelete)
                onDelete(postId)
        } catch (error) {
            console.error('Network error deleting post: ', error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <div>
                <IconButton
                    aria-label="more"
                    aria-controls={open ? 'post-options-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    sx={{   
                        border: 'none',
                    }}
                    disabled={isDeleting}
                >
                    <MoreVertIcon />
                </IconButton>

                <Menu
                    id="post-options-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={deletePost} disabled={isDeleting}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Delete post" />
                    </MenuItem>
                    {/* <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <FavoriteBorderIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Add to favorites" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <CodeIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Embed" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <ReportIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Report content" />
                    </MenuItem> */}
                </Menu>
            </div>
        </ClickAwayListener>
    )
}

export default OptionsMenu