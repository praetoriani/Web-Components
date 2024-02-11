class ShadowDOM {

    static GetHTMLelement(DOMinstance,ObjectID) {
        // Pre-Define a 'false' lookup
        let LookupSuccess = false;
        // Try to get access to all possible instances created by the web component class
        const TooltipShadowDOM = document.querySelectorAll(DOMinstance);
        LookupSuccess = false;
        // let's "walk" through all possible shadow DOMs
        for (const CurrentShadowDOM of TooltipShadowDOM) {
            // Try to get the Shadow DOM of the current HTML element
            const CurrentRoot = CurrentShadowDOM.shadowRoot;
            // If a Shadow DOM exists, search within it for the element with the given ID
            if (CurrentRoot) {
                const ObjectLookup = CurrentRoot.getElementById(ObjectID);
                // If the element is found, we're going to set a positive lookup feedback (otherwise it'll keep 'false')
                if(ObjectLookup) {
                    LookupSuccess = true;
                }
            }
        }
        // Return an array, that holds all important informations
        return [DOMinstance, ObjectID, LookupSuccess];
    }

    static ChangeVisibility(DOMinstance,ObjectID,ViewMode) {

        let [ DomObj,ObjRef,Verify ] = this.GetHTMLelement(DOMinstance,ObjectID);

        if( Verify == true ) {
            if( ViewMode.toLowerCase() == 'visible' || ViewMode.toLowerCase() == 'hidden' ) {
                document.querySelectorAll(DOMinstance).shadowRoot.getElementById(ObjectID).style.visibility = ViewMode;
            } else {
                console.warn("Error in function: ShadowDOM.ChangeVisibility()","'"+ViewMode+"' is an invalid value for param 'ViewMode'!","'ViewMode' can only be 'visible' or 'hidden'");
            }
        } else {
            console.warn("ShadowDOM.ChangeVisibility() succeeded, but there was no HTML Element with the given ID '"+ObjectID+"'",
            "ShadowDOM.ChangeVisibility() was called with the following params:",
            "DOMinstance: "+DOMinstance+"","ObjectID: "+ObjectID+"","ViewMode: "+ViewMode+"");
        }
    }

}
