import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;
const acorn = require('acorn').parse;



describe('Miscellaneous - comments', () => {
  
    it('should collect "<!-- HTML comment"', () => {
        expect(parseScript('()  => 1', {
            ranges: true,
            raw: true,
            tokens: function(a: any, b: any, c: any) {
                console.log(a)


            }})).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "body": [],
            "sourceType": "script"
        });

        
/*        expect(commentType).to.eql('SingleLineComment');
        expect(commentBody).to.eql(' HTML comment');
        expect(commentStart).to.eql(0);
        expect(commentEnd).to.eql(17);*/
    });

});