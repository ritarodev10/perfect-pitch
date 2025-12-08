"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { GetTeamTransfersResponse } from "@/types/sofascore/teams/get-team-transfers";
import { getPlayerImageUrl } from "@/utils/imageProxy";

interface TransfersSnapshotProps {
  transfers?: GetTeamTransfersResponse | null;
}

const formatTransferFee = (fee?: number): string => {
  if (!fee) return "Free";
  if (fee >= 1000000) return `€${(fee / 1000000).toFixed(1)}M`;
  if (fee >= 1000) return `€${(fee / 1000).toFixed(0)}K`;
  return `€${fee.toLocaleString()}`;
};

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const TransfersSnapshot = ({ transfers }: TransfersSnapshotProps) => {
  const transfersIn = transfers?.transfersIn?.slice(0, 3) ?? [];
  const transfersOut = transfers?.transfersOut?.slice(0, 3) ?? [];

  if (transfersIn.length === 0 && transfersOut.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        className="p-8 rounded-2xl glass-panel text-center"
      >
        <p className="text-sm text-neutral-500">No recent transfers</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="p-6 rounded-2xl glass-panel"
    >
      <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-6">
        Recent Transfers
      </h3>

      <div className="space-y-6">
        {transfersIn.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="w-4 h-4 text-green-500" />
              <span className="text-xs font-bold text-green-500 uppercase tracking-widest">
                Transfers In
              </span>
            </div>
            <div className="space-y-3">
              {transfersIn.map((transfer, index) => {
                const [imageError, setImageError] = useState(false);
                return (
                  <motion.div
                    key={transfer.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.05, duration: 0.4 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden">
                      {transfer.player.id && !imageError ? (
                        <img
                          src={getPlayerImageUrl(transfer.player.id)}
                          alt={transfer.player.name}
                          className="w-full h-full object-cover"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <span className="text-xs font-black text-white">
                          {(transfer.player.shortName ||
                            transfer.player.name)?.[0] || "?"}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">
                        {transfer.player.shortName || transfer.player.name}
                      </p>
                      <p className="text-xs text-neutral-400 truncate">
                        from {transfer.fromTeamName}
                      </p>
                      <p className="text-[10px] text-neutral-600 mt-1">
                        {formatDate(transfer.transferDateTimestamp)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-green-500">
                        {formatTransferFee(transfer.transferFee)}
                      </p>
                      {transfer.transferFeeDescription && (
                        <p className="text-[10px] text-neutral-600 mt-1">
                          {transfer.transferFeeDescription}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {transfersOut.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ArrowLeft className="w-4 h-4 text-red-500" />
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                Transfers Out
              </span>
            </div>
            <div className="space-y-3">
              {transfersOut.map((transfer, index) => {
                const [imageError, setImageError] = useState(false);
                return (
                  <motion.div
                    key={transfer.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 1.1 + transfersIn.length * 0.05 + index * 0.05,
                      duration: 0.4,
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden">
                      {transfer.player.id && !imageError ? (
                        <img
                          src={getPlayerImageUrl(transfer.player.id)}
                          alt={transfer.player.name}
                          className="w-full h-full object-cover"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <span className="text-xs font-black text-white">
                          {(transfer.player.shortName ||
                            transfer.player.name)?.[0] || "?"}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">
                        {transfer.player.shortName || transfer.player.name}
                      </p>
                      <p className="text-xs text-neutral-400 truncate">
                        to {transfer.toTeamName}
                      </p>
                      <p className="text-[10px] text-neutral-600 mt-1">
                        {formatDate(transfer.transferDateTimestamp)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-red-500">
                        {formatTransferFee(transfer.transferFee)}
                      </p>
                      {transfer.transferFeeDescription && (
                        <p className="text-[10px] text-neutral-600 mt-1">
                          {transfer.transferFeeDescription}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* View All Transfers Link */}
        <Link
          href="/squad#transfers"
          className="mt-4 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
        >
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider group-hover:text-white transition-colors">
            View All Transfers
          </span>
          <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>
    </motion.div>
  );
};
