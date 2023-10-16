//source: https://www.ps-scripts.com/viewtopic.php?p=50459&sid=87a0f783258574a2c4dc322a0c4a1ed9#p50459

var runphotomergeFromScript = true; // must be before Photomerge include
//@includepath "/C/Program Files/Adobe/Adobe Photoshop CC 2019/Presets/Scripts/"
//@include "Photomerge.jsx"
//@show include

photoshopOpts = new PhotoshopSaveOptions();
photoshopOpts.embedColorProfile = true;
photoshopOpts.alphaChannels = true;
photoshopOpts.layers = true;

var workFolder = Folder.selectDialog();
var folders = workFolder.getFiles( function( file ) { return file instanceof Folder; } );

for( var i = 0; i < folders.length; i++ ) {
   
   var folderList = workFolder.getFiles( '*.png' );

   // override Photomerge.jsx settings. Default is "Auto". Uncomment to override the default.
   //photomerge.alignmentKey   = "Auto";
   //photomerge.alignmentKey   = "Prsp";
   //photomerge.alignmentKey   = "cylindrical";
   //photomerge.alignmentKey   = "spherical";
   //photomerge.alignmentKey   = "sceneCollage";
   //photomerge.alignmentKey   = "translation"; // "Reposition" in layout dialog   

   // other setting that may need to be changed. Defaults below
   photomerge.advancedBlending      = true; // 'Bend Images Together' checkbox in dialog
   photomerge.lensCorrection      = false; // Geometric Distortion Correction'checkbox in dialog
   photomerge.removeVignette      = false; // 'Vignette Removal' checkbox in dialog

   if( folderList.length > 1 ){
      photomerge.createPanorama(folderList,false);
   }
   // The merged doc will be the activeDocument
   activeDocument.saveAs( new File( folderList[0].parent + '/completed.psd' ) , photoshopOpts, true, Extension.LOWERCASE);
   activeDocument.close( SaveOptions.DONOTSAVECHANGES );
}
