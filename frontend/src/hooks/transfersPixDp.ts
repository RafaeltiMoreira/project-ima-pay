import { useContextSelector } from "use-context-selector";
import {
  TransfersContextDp,
  TransfersContextPix,
} from "../contexts/TransfersContextPixDp";
import { useMemo } from "react";

export function transfersPixDp() {
  const transfersdp = useContextSelector(TransfersContextDp, (context) => {
    return context.transfersdp;
  });

  const transferDp = useMemo(() => {
    return transfersdp.reduce(
      (accDp, transfersDp) => {
        if (transfersDp.type === "input") {
          accDp.input += transfersDp.price;
        } else {
          accDp.output += transfersDp.price;
        }

        return accDp;
      },
      { input: 0, output: 0 }
    );
  }, [transfersdp]);

  const transferspix = useContextSelector(TransfersContextPix, (context) => {
    return context.transferspix;
  });

  const transferPix = useMemo(() => {
    return transferspix.reduce(
      (accPix, transfersPix) => {
        if (transfersPix.type === "input") {
          accPix.input += transfersPix.price;
        } else {
          accPix.output += transfersPix.price;
        }

        return accPix;
      },
      { input: 0, output: 0 }
    );
  }, [transferspix]);

  const totalTransfers = {
    input: transferPix.input + transferDp.input,
    output: transferPix.output + transferDp.output,
    total:
      transferPix.input -
      transferPix.output +
      (transferDp.input - transferDp.output),
  };

  return totalTransfers;
}
