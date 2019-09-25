declare module "oncoprintjs"
{
    export default class OncoprintJS<D> {
        webgl_unavailable: boolean;
        setMinimapVisible:(visible:boolean)=>void;
        scrollTo:(left:number)=>void;
        onHorzZoom:(callback:(newHorzZoom:number)=>void)=>void;
        onMinimapClose:(callback:()=>void)=>void;
        moveTrack:(target_track:TrackId, new_previous_track:TrackId)=>void;
        setTrackGroupOrder:(index:TrackGroupIndex, track_order:TrackGroup)=>void;
        keepSorted:(keep_sorted:boolean)=>void;
        addTracks:(params_list:TrackSpec<D>[])=>TrackId[];
        removeTrack:(track_id:TrackId)=>void;
        removeTracks:(track_ids:TrackId[])=>void;
        getTracks:()=>TrackId[];
        removeAllTracks: () => void;
        removeExpansionTracksFor: (parent_track: TrackId) => void;
        disableTrackExpansion: (track_id: TrackId) => void;
        enableTrackExpansion: (track_id: TrackId) => void;
        removeAllExpansionTracksInGroup: (index: TrackGroupIndex) => void;
        setHorzZoomToFit: (ids: string[]) => void;
        updateHorzZoomToFitIds:(ids:string[])=>void;
        getMinHorzZoom:()=>number;
        getHorzZoom:()=>number;
        setHorzZoom:(z:number, still_keep_horz_zoomed_to_fit?:boolean)=>number;
        getVertZoom:()=>number;
        setVertZoom:(z:number)=>number;
        setScroll:(scroll_left:number, scroll_top:number)=>void;
        setZoom:(zoom_x:number, zoom_y:number)=>void;
        setHorzScroll:(s:number)=>number;
        setVertScroll:(s:number)=>number;
        setViewport:(col:number, scroll_y_proportion:number, num_cols:number, zoom_y:number)=>void;
        getTrackData:(track_id:TrackId)=>D[];
        getTrackDataIdKey:(track_id:TrackId)=>string;
        setTrackData:(track_id:TrackId, data:D[], data_id_key:string)=>void;
        setTrackImportantIds:(track_id:TrackId, ids?:string[])=>void;
        setTrackGroupSortPriority:(priority:TrackGroupIndex[])=>void;
        setTrackGroupLegendOrder:(group_order:TrackGroupIndex[])=>void;
        setTrackSortDirection:(track_id:TrackId, dir:TrackSortDirection)=>TrackSortDirection;
        setTrackSortComparator:(track_id:TrackId, sortCmpFn:TrackSortSpecification<any>)=>void;
        getTrackSortDirection:(track_id:TrackId)=>TrackSortDirection;
        setTrackInfo:(track_id:TrackId, msg:string)=>void;
        setTrackInfoTooltip:(track_id:TrackId, $tooltip_elt:any)=>void;//$tooltip_elt is JQuery HTML element
        setTrackTooltipFn:(track_id:TrackId, tooltipFn:TrackTooltipFn<any>)=>void;
        sort:()=>void;
        shareRuleSet:(source_track_id:TrackId, target_track_id:TrackId)=>void;
        setRuleSet:(track_id:TrackId, rule_set_params:RuleSetParams)=>void;
        setSortConfig:(params:SortConfig)=>void;
        setIdOrder:(ids:string[])=>void;
        suppressRendering:()=>void;
        releaseRendering:(onComplete?:()=>void)=>void;
        triggerPendingResizeAndOrganize:(onComplete?:()=>void)=>void;
        hideIds:(to_hide:string[], show_others?:boolean)=>void;
        hideTrackLegends:(track_ids:TrackId[])=>void;
        showTrackLegends:(track_ids:TrackId[])=>void;
        setCellPaddingOn:(cell_padding_on:boolean)=>void;
        toSVG:(with_background:boolean)=>SVGElement;
        toCanvas:(callback:(canvas:HTMLCanvasElement, truncated:boolean)=>void, resolution:number)=>HTMLImageElement;
        toDataUrl:(callback:(dataURL:string)=>void)=>void;
        highlightTrack:(track_id:TrackId|null)=>void;
        getIdOrder:(all?:boolean)=>string[];
        setIdClipboardContents:(array:string[])=>void;
        getIdClipboardContents:()=>string[];
        onClipboardChange:(callback:(array:string[])=>void)=>void;
        setTrackCustomOptions:(track_id:TrackId, custom_options?:CustomTrackOption[])=>void;
        setShowTrackSublabels:(show:boolean)=>void;
        clearMouseOverEffects:()=>void;
        setTrackMovable:(track_id:TrackId, movable:boolean)=>void;
        setWidth:(width:number)=>void;
        setColumnLabels:(labels:{[uid:string]:string})=>void;
        setHighlightedIds:(uids:string[])=>void;
        onCellMouseOver:(callback:(uid:string|null, track_id:TrackId)=>void)=>void; // null indicates no mouseover
        onCellClick:(callback:(uid:string|null, track_id:TrackId)=>void)=>void; // null indicates click in empty area

        constructor(ctr_selector:string, width:number, params?:InitParams);
        destroy:()=>void;
    }
}
