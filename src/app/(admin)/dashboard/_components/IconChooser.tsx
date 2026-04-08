"use client";

import { useState, useMemo } from "react";

const COMMON_ICONS = [
    // Extended Material Symbols (broad coverage)
    "accessibility", "account_circle", "account_box", "add_alert", "add_shopping_cart", "alarm", "android", "announcement",
    "apps", "arrow_back", "arrow_forward", "arrow_drop_down", "aspect_ratio", "assessment", "assignment", "attach_file",
    "attach_money", "autorenew", "av_timer", "backspace", "battery_std", "beach_access", "bookmark", "bug_report",
    "build_circle", "cached", "camera_alt", "camera_front", "call", "call_end", "cancel", "card_giftcard",
    "category", "chat", "chat_bubble", "check_circle", "chrome_reader_mode", "movie", "clear_all", "close",
    "cloud_done", "cloud_upload", "cloud_download", "code", "code_off", "comment", "commute", "contact_page",
    "crop", "dashboard", "data_saver_off", "delete", "delete_forever", "departures", "departure_board", "desktop_mac",
    "desktop_windows", "device_hub", "directions_bike", "directions_boat", "directions_bus", "directions_car", "directions_railway",
    "directions_run", "directions_subway", "directions_walk", "disc_full", "dns", "done", "door_front", "drag_handle",
    "eco", "edit", "edit_location", "eject", "email", "emoji_emotions", "equalizer", "error", "escalator", "ev_station",
    "event", "expand", "explore", "explore_off", "extension", "face", "fast_forward", "fast_rewind",
    "favorite", "favorite_border", "feedback", "file_copy", "filter_alt", "fingerprint", "fitness_center", "flag",
    "flight", "flight_land", "flight_takeoff", "flip_camera_android", "folder", "folder_open", "format_align_center", "format_bold",
    "format_clear", "format_color_fill", "format_indent_increase", "format_italic", "forum", "forward", "g_mobiledata", "g_translate",
    "gavel", "gesture", "gif", "grade", "grading", "handyman", "hash", "headphones", "healing", "hearing", "height",
    "help", "help_outline", "highlight", "history", "holiday_village", "home", "home_repair_service", "hourglass_full", "http",
    "image_search", "inbox", "info", "info_outline", "insights", "integration_instructions", "invert_colors", "keyboard",
    "language", "launch", "layers", "leaderboard", "library_books", "light_mode", "link", "link_off", "list", "live_help",
    "local_activity", "local_cafe", "local_florist", "local_hospital", "local_offer", "location_city", "location_on", "lock",
    "login", "logout", "loyalty", "mail", "mail_outline", "manage_accounts", "map", "markunread", "maximize", "memory",
    "menu", "merge_type", "message", "mic", "mic_off", "minimize", "model_training", "mode", "money_off", "mood",
    "more_horiz", "more_vert", "motorcycle", "mouse", "move_to_inbox", "multiline_chart", "music_note", "near_me", "network_check",
    "new_releases", "next_plan", "nightlight_round", "no_encryption", "note", "not_started", "notification_important", "offline_bolt",
    "offline_pin", "on_device_training", "online_prediction", "opacity", "outdoor_grill", "outlet", "pages", "paid", "palette",
    "pan_tool", "payment", "people", "people_alt", "perm_contact_calendar", "perm_data_setting", "perm_device_information",
    "perm_media", "perm_phone_msg", "perm_scan_wifi", "pets", "phone_android", "photo_camera", "picture_in_picture", "pin_drop",
    "place", "play_arrow", "podcasts", "policy", "poll", "polymer", "power_settings_new", "precision_manufacturing", "preview",
    "print", "priority_high", "public", "public_off", "push_pin", "qr_code", "query_builder", "question_answer", "quiz",
    "radio_button_checked", "railway_alert", "receipt_long", "record_voice_over", "redeem", "reply", "report", "report_off", "request_quote",
    "restaurant_menu", "reviews", "room", "rss_feed", "rule", "safety_check", "sanitizer", "save", "scanner", "schedule_send",
    "school", "science", "score", "screen_lock_landscape", "screen_rotation", "sensors", "sentiment_very_satisfied", "settings",
    "settings_suggest", "share", "share_location", "shopping_bag", "shopping_basket", "shop", "shuffle", "sick", "signal_cellular_alt",
    "skip_next", "skip_previous", "snooze", "soap", "solar_power", "sort", "south", "space_dashboard", "speaker", "speaker_group",
    "speed", "sports_esports", "sports_soccer", "square_foot", "stacked_bar_chart", "star", "star_border", "stars", "stay_current_portrait",
    "sticky_note_2", "storefront", "subject", "subtitles", "support", "swap_horiz", "swipe", "sync", "system_update", "tab",
    "table_chart", "tag", "task", "terminal", "text_fields", "thumb_down", "thumb_up", "tire_repair", "toggle_off", "token",
    "topic", "touch_app", "tour", "track_changes", "translate", "trending_flat", "trending_down", "trending_up", "tune",
    "turn_left", "turn_right", "tv", "upgrade", "verified_user", "vertical_split", "video_label", "videogame_asset", "view_agenda",
    "view_array", "view_day", "view_in_ar", "view_week", "visibility", "visibility_off", "voice_chat", "vpn_lock", "wallpaper",
    "warning_amber", "water", "waves", "wb_sunny", "wifi", "workspaces", "wrench", "youtube_searched_for", "zoom_in"
];

interface IconChooserProps {
    value: string;
    onChange: (icon: string) => void;
    label?: string;
    className?: string;
}

export default function IconChooser({ value, onChange, label, className }: IconChooserProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredIcons = useMemo(() => {
        const query = searchTerm.toLowerCase().trim().replace(/\s+/g, '_');
        if (!query) return COMMON_ICONS;
        return COMMON_ICONS.filter(icon => icon.toLowerCase().includes(query));
    }, [searchTerm]);

    return (
        <div className={`relative w-full ${className || ''}`}>
            {label && <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">{label}</label>}

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-3 p-2.5 bg-white border-2 rounded-xl cursor-pointer transition-all ${isOpen ? 'border-primary ring-4 ring-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
            >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 overflow-hidden ${value ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}>
                    <span className="material-symbols-outlined text-[20px]">{value || 'add_reaction'}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${value ? 'text-gray-900' : 'text-gray-400'}`}>{value || 'Choose Icon...'}</p>
                </div>
                <span className={`material-symbols-outlined text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </div>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-100" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-100 overflow-hidden animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
                        <div className="p-3 border-b border-gray-50">
                            <input
                                type="text"
                                placeholder="Search or type custom icon name..."
                                className="w-full px-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <div className="p-2 max-h-60 overflow-y-auto grid grid-cols-6 gap-1 custom-scrollbar">
                            {filteredIcons.map((icon) => (
                                <button
                                    key={icon}
                                    type="button"
                                    onClick={() => {
                                        onChange(icon);
                                        setIsOpen(false);
                                    }}
                                    className={`aspect-square flex items-center justify-center rounded-lg transition-all overflow-hidden ${value === icon ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-500'
                                        }`}
                                    title={icon}
                                >
                                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                                </button>
                            ))}

                            {searchTerm && !filteredIcons.includes(searchTerm) && (
                                <button
                                    onClick={() => {
                                        onChange(searchTerm.toLowerCase().trim().replace(/\s+/g, '_'));
                                        setIsOpen(false);
                                    }}
                                    className="col-span-full p-3 text-center bg-gray-50 rounded-lg hover:bg-primary/5 transition-all"
                                >
                                    <p className="text-xs font-bold text-primary">Use custom icon: "{searchTerm}"</p>
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

