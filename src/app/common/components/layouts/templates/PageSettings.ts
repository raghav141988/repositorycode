export class PageSettings {
    headerFontSize?:string;
    colorTheme?:String;
    fontColor?:String;
    padding?:Padding;
    contentFontSize?:string;
    headerFontStyle?:string;
    contentFontStyle?:string;
    cssClass?:string;
    showContent?:boolean=true;
    isPreviewMode?:boolean;
    isSharedReadOnlyMode?:boolean;
}
export class Padding {
    padding:number;
    top:number;
    bottom:number;
    left:number;
    right:number;

}
